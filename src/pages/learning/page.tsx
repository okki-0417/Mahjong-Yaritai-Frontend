import { Link } from "react-router";

export default function Learning() {
  return (
    <div className="max-w-4xl lg:mx-auto mx-4 mt-36">
      <h1 className="lg:text-5xl text-xl mt-12 font-bold">麻雀ハジメタイ</h1>
      <hr className="mt-3" />

      <ul className="mt-20 parent-list flex flex-col gap-3 text-2xl">
        <li>
          <Link to="/learning/8" className="hover:underline">
            麻雀を遊べる環境を準備しよう
          </Link>

          <ul className="nested-list-1 mt-1 text-lg">
            <li>
              <Link to="/learning/8#heading-1-1" className="hover:underline">
                オンライン麻雀に登録 / 麻雀アプリをインストールしてみよう
              </Link>
            </li>

            <li>
              <Link to="/learning/8#heading-1-2" className="hover:underline">
                一局やってみよう
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/learning/2" className="hover:underline">
            麻雀の基本を覚えよう
          </Link>

          <ul className="nested-list-1 mt-1 text-lg has-[list]:hover:underline">
            <li>
              <Link to="/learning/2#1-1" className="hover:underline">
                オンライン麻雀に登録 / 麻雀アプリをインストールしてみよう
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
