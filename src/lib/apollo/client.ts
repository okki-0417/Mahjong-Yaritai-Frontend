import { ApolloClient, InMemoryCache } from "@apollo/client";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";

// ファイルアップロード対応のカスタムfetch関数
const customFetch = (uri: string | Request | URL, options?: any) => {
  // multipart/form-dataの場合はContent-Typeを削除（ブラウザが自動設定）
  if (options?.body instanceof FormData) {
    const headers = new Headers(options.headers);
    headers.delete("content-type");
    return fetch(uri, {
      ...options,
      headers,
    });
  }
  return fetch(uri, options);
};

// アップロード対応のLink作成
const uploadLink = new UploadHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  credentials: "include",
  fetch: customFetch,
});

// ファイルアップロード対応のlinkを使用
export const apolloClient = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
  },
});
