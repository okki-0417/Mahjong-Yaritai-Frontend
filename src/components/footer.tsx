import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="mt-32 w-full lg:h-72 flex flex-col justify-between bg-gray-800">
      <nav className="lg:px-16 px-8 lg:pt-12 lg:pb-12 pt-8 pb-20">
        <ul className="flex lg:flex-row flex-col lg:gap-16 gap-8">
          <Link to="/" className="font-bold hover:text-white lg:text-xl">
            <li className="flex items-center gap-1">
              <FaAngleRight size={16} />
              <span>ホーム</span>
            </li>
          </Link>
          <li>
            <span className="font-bold lg:text-xl text-base">プロフィール</span>
            <ul className="lg:text-lg text-sm lg:mt-2 mt-1 flex flex-col gap-1">
              <Link to="/profile" className="hover:text-white">
                <li className="flex items-center gap-1 lg:pl-0 pl-4">
                  <FaAngleRight size={12} />
                  <span>見る</span>
                </li>
              </Link>

              <Link to="/profile/edit" className="hover:text-white">
                <li className="flex items-center gap-1 lg:pl-0 pl-4">
                  <FaAngleRight size={12} />
                  <span>編集する</span>
                </li>
              </Link>
            </ul>
          </li>
          <li>
            <span className="font-bold lg:text-xl text-base">何切る問題</span>
            <ul className="lg:text-lg text-sm lg:mt-2 mt-1 flex flex-col gap-1">
              <Link to="/what-to-discard-problems" className="hover:text-white">
                <li className="flex items-center gap-1 lg:pl-0 pl-4">
                  <FaAngleRight size={12} />
                  <span>一覧</span>
                </li>
              </Link>

              <Link
                to="/what-to-discard-problems/new"
                className="hover:text-white"
              >
                <li className="flex items-center gap-1 lg:pl-0 pl-4">
                  <FaAngleRight size={12} />
                  <span>新規作成</span>
                </li>
              </Link>
            </ul>
          </li>
        </ul>
      </nav>
      <p className="text-center py-2 bg-gray-900">
        &copy; <span>2025</span>
      </p>
    </footer>
  );
}
