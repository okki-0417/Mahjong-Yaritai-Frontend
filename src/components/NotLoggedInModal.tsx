import { useSetModal } from "@/src/hooks/useSetModal";
import Link from "next/link";

export default function NotLoggedInModal() {
  const setModalName = useSetModal();

  return (
    <div className="transition-all fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-10 fast-fade-in lg:px-0 px-4">
      <div className="opacity-100 md:w-1/2 md:h-1/2 rounded bg-white text-gray-700 px-4 relative py-8">
        <button
          onClick={() => setModalName(null)}
          className="absolute -top-4 -right-4 leading-8 pb-1 w-9 bg-white border border-gray-500 rounded-full text-gray-700 text-2xl"
        >
          ×
        </button>

        <h1 className="lg:text-2xl text-xl text-center font-bold">
          この機能はログインしている時のみ利用できます。
        </h1>

        <div className="mt-8">
          <div className="text-center">
            <Link href="/auth/login" onClick={() => setModalName(null)}>
              <button className="btn btn-sm btn-main text-xl">
                ログインする
              </button>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/authorization-session"
              onClick={() => setModalName(null)}
            >
              <button className="btn btn-main text-xl">
                新規ユーザー登録する
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
