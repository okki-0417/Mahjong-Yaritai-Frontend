const errorMessage: {
  [key: number]: string;
} = {
  400: "問題が発生しました。",
  401: "ログインしてください。",
  403: "アクセス権限がありません。",
  404: "ページが見つかりませんでした。",
  500: "サーバーで問題が発生しました。",
};

export default function ErrorPage({
  status,
  message,
}: {
  status: number;
  message?: string | null;
}) {
  return (
    <div className="mt-32 max-w-screen-lg mx-auto">
      <h1 className="text-center text-7xl">{status}</h1>
      <p className="mt-12 text-3xl text-center">
        {message || errorMessage[status] || "エラーが発生しました。"}
      </p>
    </div>
  );
}
