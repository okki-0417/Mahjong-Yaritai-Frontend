import Link from "next/link";

export default function AlreadyLoggedIn() {
  return (
    <div className="w-96 mx-auto flex flex-col items-center mt-24">
      <span className="text-3xl">既にログイン済みです</span>
      <Link href="/dashboard" className="btn btn-main mt-8">
        ダッシュボードに戻る
      </Link>
    </div>
  );
}
