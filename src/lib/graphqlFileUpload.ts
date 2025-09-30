"use client";

// @deprecated このライブラリは非推奨です
// 新しい実装では Apollo Client + apollo-upload-client を使用してください
// 詳細: docs/GraphQLPatterns.md

// GraphQL file upload utilities

interface GraphQLFileUploadOptions {
  query: string;
  variables: Record<string, any>;
}

/**
 * GraphQLでファイルアップロードを行う関数
 * multipart/form-dataでリクエストを送信
 */
export async function executeFileUploadMutation({ query, variables }: GraphQLFileUploadOptions) {
  const formData = new FormData();

  // GraphQLクエリを追加
  formData.append("query", query);

  // variablesを処理してFormDataに追加
  const processedVariables = processVariables(variables, formData);
  formData.append("variables", JSON.stringify(processedVariables));

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await fetch(`${apiUrl}/graphql`, {
    method: "POST",
    // Cookie認証のため
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map((e: any) => e.message).join(", "));
  }

  return result;
}

/**
 * variablesからファイルを抽出してFormDataに追加
 * ファイル以外の値は返却用オブジェクトに含める
 */
function processVariables(
  variables: Record<string, any>,
  formData: FormData,
  path = "",
): Record<string, any> {
  const processed: Record<string, any> = {};

  for (const [key, value] of Object.entries(variables)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (value instanceof File) {
      // ファイルはFormDataに追加し、variablesでは参照を設定
      const fileKey = `file_${Object.keys(processed).length}`;
      formData.append(fileKey, value);
      // GraphQLスキーマでUploadType処理
      processed[key] = null;
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      // ネストしたオブジェクトを再帰処理
      processed[key] = processVariables(value, formData, currentPath);
    } else {
      // 通常の値はそのまま設定
      processed[key] = value;
    }
  }

  return processed;
}

/**
 * updateUser専用のヘルパー関数
 */
export function updateUserWithFile(
  _client: any,
  input: {
    name?: string;
    profileText?: string;
    avatar?: File;
  },
) {
  const query = `
    mutation UpdateUser($input: UpdateUserInput!) {
      updateUser(input: $input) {
        user {
          id
          name
          email
          profileText
          avatarUrl
          createdAt
          updatedAt
        }
        errors
      }
    }
  `;

  return executeFileUploadMutation({
    query,
    variables: { input },
  });
}

/**
 * createUser専用のヘルパー関数
 */
export function createUserWithFile(
  _client: any,
  input: {
    name: string;
    email: string;
    profileText?: string;
    avatar?: File;
  },
) {
  const query = `
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        user {
          id
          name
          email
          profileText
          avatarUrl
          createdAt
          updatedAt
        }
        errors
      }
    }
  `;

  return executeFileUploadMutation({
    query,
    variables: { input },
  });
}
