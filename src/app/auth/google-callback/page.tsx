/* eslint-disable no-process-env, no-console */
import { redirect } from "next/navigation";
import createApiPageClient from "@/src/lib/api/server";
import { Container, Box, Text, Alert, AlertIcon } from "@chakra-ui/react";

type GoogleTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token?: string;
};

type GoogleUserInfo = {
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
};

export default async function GoogleCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string }>;
}) {
  const params = await searchParams;
  // エラーがある場合の処理
  if (params.error) {
    return (
      <Container mt="20" maxW="2xl">
        <Alert status="error">
          <AlertIcon />
          <Box color="red.500">
            <Text fontSize="lg" fontWeight="bold">
              認証エラー
            </Text>
            <Text>Google認証でエラーが発生しました: {params.error}</Text>
          </Box>
        </Alert>
      </Container>
    );
  }

  // codeパラメータがない場合
  if (!params.code) {
    return (
      <Container mt="20" maxW="2xl">
        <Alert status="error">
          <AlertIcon />
          <Box color="red.500">
            <Text fontSize="lg" fontWeight="bold">
              認証エラー
            </Text>
            <Text>認証コードが見つかりません。もう一度お試しください。</Text>
          </Box>
        </Alert>
      </Container>
    );
  }

  try {
    // 1. codeをアクセストークンに交換
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code: params.code,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI || "",
        grant_type: "authorization_code",
        access_type: "offline",
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Token exchange failed:", errorData);
      throw new Error("アクセストークンの取得に失敗しました");
    }

    const tokenData: GoogleTokenResponse = await tokenResponse.json();

    // 2. アクセストークンを使ってユーザー情報を取得
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      const errorData = await userInfoResponse.text();
      console.error("User info fetch failed:", errorData);
      throw new Error("ユーザー情報の取得に失敗しました");
    }

    const userInfo: GoogleUserInfo = await userInfoResponse.json();

    // 3. メールアドレスを使ってバックエンドの /auth/request にリクエスト
    const apiPageClient = await createApiPageClient();
    await apiPageClient.createAuthRequest({
      auth_request: {
        email: userInfo.email,
      },
    });

    // 4. 成功したら /users/new にリダイレクト
    redirect("/users/new");
  } catch (error) {
    console.error("Google OAuth callback error:", error);

    return (
      <Container mt="20" maxW="2xl">
        <Alert status="error">
          <AlertIcon />
          <Box color="red.500">
            <Text fontSize="lg" fontWeight="bold">
              認証エラー
            </Text>
            <Text>認証処理中にエラーが発生しました。もう一度お試しください。</Text>
            {error instanceof Error && (
              <Text fontSize="sm" color="gray.400" mt="2">
                {error.message}
              </Text>
            )}
          </Box>
        </Alert>
      </Container>
    );
  }
}
