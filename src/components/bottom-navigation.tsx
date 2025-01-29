import { BsGraphUpArrow } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { GiThink } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router";

export default function BottomNavigation() {
  return (
    <nav className="md:hidden block w-full h-16 bg-gray-900 fixed bottom-0">
      <ul className="flex justify-around items-center h-full">
        <Link to="/">
          <li className="flex items-center flex-col">
            <IoHomeOutline color="white" size={25} title="ホーム" />
            <span className="text-[10px]">ホーム</span>
          </li>
        </Link>
        <Link to="/records">
          <li className="flex items-center flex-col w-10 aspect-square">
            <BsGraphUpArrow color="white" size={25} title="記録" />
            <span className="text-[10px]">記録</span>
          </li>
        </Link>
        <Link to="/what-to-discard-problems">
          <li className="flex items-center flex-col w-10 aspect-square">
            <GiThink color="white" size={25} title="何切る問題" />
            <span className="text-[10px]">何切る？</span>
          </li>
        </Link>
        <Link to="/settings">
          <li className="flex items-center flex-col w-10 aspect-square">
            <FaGear color="white" size={25} title="設定" />
            <span className="text-[10px]">設定</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
