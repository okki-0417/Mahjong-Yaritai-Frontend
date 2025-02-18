import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { BASEURL } from "../ApiConfig";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { AuthStateContext } from "../contexts/AuthStateContextProvider";

export default function Navigation() {
  const { auth, setAuth } = useContext(AuthStateContext);
  const [checked, setChecked] = useState<boolean>(false);

  const logout = async () => {
    confirm("ログアウトしますか？");
    const response = await fetch(`${BASEURL}/session`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("ログアウトに失敗しました");
    }

    setAuth(false);
  };

  return (
    <>
      <header className="w-full overflow-x-hidden relative">
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
                <span className="lg:text-3xl text-2xl font-bold text-gray-300 hover:text-white">
                  麻雀ヤリタイ
                </span>
              </NavLink>
            </div>

            <div className="md:flex hidden space-x-4 text-xl">
            {/* (
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white"
                >
                  ログアウト
                </button>
              ) : ( */}
              {!auth && (
                <div>
                  <NavLink
                    to="/auth/login"
                    className="text-gray-300 hover:text-white"
                  >
                    ログイン
                  </NavLink>
                  <NavLink
                    to="/users/new"
                    className="text-gray-300 hover:text-white"
                  >
                    ユーザー登録
                  </NavLink>
                </div>
              )}
              <NavLink
                to="/what-to-discard-problems"
                className="text-gray-300 hover:text-white"
              >
                何切る問題
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
