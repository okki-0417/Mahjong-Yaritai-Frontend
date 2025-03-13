import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { BASEURL } from "../ApiConfig";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { FaAngleRight, FaGear } from "react-icons/fa6";
import { AuthStateContext } from "../contexts/AuthStateContextProvider";
import { GiThink } from "react-icons/gi";
import { RiArticleFill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";

export default function Navigation() {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <header className="w-full overflow-x-hidden fixed z-50">
        <nav className="bg-gray-900 h-20 flex items-center">
          <div className="w-4/5  mx-auto px-4 sm:px-6 relative flex md:justify-between justify-center items-center">
            <div className="flex items-center pr-8">
              <NavLink
                to="/"
                className="font-bold text-2xl flex items-center gap-4"
              >
                <div className="rounded-full overflow-hidden">
                  <img
                    src="/logo.webp"
                    alt="麻雀好きが集まる場所"
                    className="lg:w-12 lg:h-12 w-10 h-10 object-contain"
                  />
                </div>
                <span className="lg:text-3xl text-2xl font-bold text-white">
                  麻雀ヤリタイ
                </span>
              </NavLink>
            </div>

            <div className="md:flex hidden gap-5 items-center text-lg">
              <NavLink
                to="/learning"
                className="text-white flex gap-1 items-center"
              >
                <img src="/beginner-icon.webp" alt="" className="w-6" />
                <div>ハジメタイ</div>
              </NavLink>

              <NavLink
                to="/what-to-discard-problems"
                className="text-white flex gap-1 items-center"
              >
                <GiThink size={25} color="white" />
                <div className="tracking-widest">何切る問題</div>
              </NavLink>

              <NavLink
                to="/articles"
                className="text-white flex gap-1 items-center"
              >
                <RiArticleFill size={20} color="white" />
                <div>ブログ</div>
              </NavLink>

              <NavLink
                to="/records"
                className="text-white flex gap-2 items-center"
              >
                <BsGraphUpArrow size={20} color="white" />
                <div>戦績の記録</div>
              </NavLink>

              <NavLink
                to="/settings"
                className="text-white flex gap-2 items-center"
              >
                <FaGear size={20} color="white" />
                <div>設定</div>
              </NavLink>
            </div>

            <button
              className="flex flex-col gap-[7px] md:hidden z-50 absolute top-1/2 -right-5 -translate-y-1/2"
              onClick={() => setChecked(!checked)}
            >
              <input
                type="checkbox"
                id="side-menu"
                hidden
                className="peer"
                defaultChecked={checked}
              />
              <span
                className={`w-7 h-[3px] bg-white transition-all ${checked && "rotate-45 translate-y-[6px] w-8"}`}
              />
              <span className={`w-7 h-[3px] bg-white ${checked && "hidden"}`} />
              <span
                className={`w-7 h-[3px] bg-white transition-all ${checked && "-rotate-45 -translate-y-1 w-8"}`}
              />
            </button>
          </div>
        </nav>

        <nav
          className={`fixed top-0 right-0 z-40 bg-base w-3/4 max-w-80 h-screen transition-all ${!checked && "translate-x-full"}`}
        >
          <ul className="text-white px-8 pt-16 flex flex-col gap-4">
            <li>
              <input id="profile" type="checkbox" className="hidden peer" />
              <label
                htmlFor="profile"
                className="text-lg inline-flex items-center gap-1"
              >
                <span>プロフィール</span>
              </label>

              <div className="w-fit ml-1 inline-block peer-checked:hidden">
                <IoIosArrowBack />
              </div>
              <div className="w-fit ml-1 hidden peer-checked:inline-block">
                <IoIosArrowDown />
              </div>

              <ul className="h-0 overflow-hidden peer-checked:h-auto ml-4">
                <NavLink to="profile">
                  <li className="flex gap-1 items-center">
                    <FaAngleRight size={12} />
                    <span>プロフィール</span>
                  </li>
                </NavLink>
                <NavLink to="profile/edit">
                  <li className="flex gap-1 items-center">
                    <FaAngleRight size={12} />
                    <span>編集</span>
                  </li>
                </NavLink>
              </ul>
            </li>

            <li>
              <input
                id="what-to-discard-problems"
                type="checkbox"
                className="hidden peer"
              />
              <label
                htmlFor="what-to-discard-problems"
                className="text-lg inline-flex items-center gap-1"
              >
                <span>何切る問題</span>
              </label>

              <div className="w-fit ml-1 inline-block peer-checked:hidden">
                <IoIosArrowBack />
              </div>
              <div className="w-fit ml-1 hidden peer-checked:inline-block">
                <IoIosArrowDown />
              </div>

              <ul className="h-0 overflow-hidden peer-checked:h-auto ml-4">
                <NavLink to="what-to-discard-problems">
                  <li className="flex gap-1 items-center">
                    <FaAngleRight size={12} />
                    <span>一覧</span>
                  </li>
                </NavLink>
                <NavLink to="what-to-discard-problems/new">
                  <li className="flex gap-1 items-center">
                    <FaAngleRight size={12} />
                    <span>新規作成</span>
                  </li>
                </NavLink>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <label
        htmlFor="side-menu"
        className={`absolute top-0 left-0 z-30 bg-black opacity-[0.5] w-screen h-screen ${!checked && "hidden"}`}
      />
    </>
  );
}
