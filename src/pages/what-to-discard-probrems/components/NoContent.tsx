import { Link } from "react-router";
import { useContext } from "react";
import { AuthStateContext } from "../../../contexts/AuthStateContextProvider";

export default function NoContent() {
  const { auth } = useContext(AuthStateContext);
  return (
    <div className="px-4 lg:text-2xl text-lg w-fit mx-auto text-center flex flex-col items-center mt-24">
      <p>
        何切る問題はまだ投稿されていません。
        <br />
        {auth ? (
          ""
        ) : (
          <span>
            <Link
              to="/users/new"
              className="text-blue-400 hover:text-blue-200 underline"
            >
              ユーザー登録
            </Link>
            <span>して</span>
          </span>
        )}
        最初の問題を
        <br className="lg:hidden" />
        投稿しに行きましょう！
      </p>
      {auth && (
        <Link to="/what-to-discard-problems/new" className="btn btn-main mt-8">
          何切る問題を作りにいく
        </Link>
      )}
    </div>
  );
}
