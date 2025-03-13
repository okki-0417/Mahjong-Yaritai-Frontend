import { BsGraphUpArrow } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { GiThink } from "react-icons/gi";
import { RiArticleFill } from "react-icons/ri";
import { Link } from "react-router";
import FadeInSection from "../components/FadeInSection";
import TileImage from "../components/TileImage";

export const tileImagePaths = [
  { id: 1, path: "/tiles/1.webp" },
  { id: 2, path: "/tiles/2.webp" },
  { id: 3, path: "/tiles/3.webp" },
  { id: 4, path: "/tiles/4.webp" },
  { id: 5, path: "/tiles/5.webp" },
  { id: 6, path: "/tiles/6.webp" },
  { id: 7, path: "/tiles/7.webp" },
  { id: 8, path: "/tiles/8.webp" },
  { id: 9, path: "/tiles/9.webp" },
  { id: 10, path: "/tiles/10.webp" },
  { id: 11, path: "/tiles/11.webp" },
  { id: 12, path: "/tiles/12.webp" },
  { id: 13, path: "/tiles/13.webp" },
  { id: 14, path: "/tiles/14.webp" },
  { id: 15, path: "/tiles/15.webp" },
  { id: 16, path: "/tiles/16.webp" },
  { id: 17, path: "/tiles/17.webp" },
  { id: 18, path: "/tiles/18.webp" },
  { id: 19, path: "/tiles/19.webp" },
  { id: 20, path: "/tiles/20.webp" },
  { id: 21, path: "/tiles/21.webp" },
  { id: 22, path: "/tiles/22.webp" },
  { id: 23, path: "/tiles/23.webp" },
  { id: 24, path: "/tiles/24.webp" },
  { id: 25, path: "/tiles/25.webp" },
  { id: 26, path: "/tiles/26.webp" },
  { id: 27, path: "/tiles/27.webp" },
  { id: 28, path: "/tiles/28.webp" },
  { id: 29, path: "/tiles/29.webp" },
  { id: 30, path: "/tiles/30.webp" },
  { id: 31, path: "/tiles/31.webp" },
  { id: 32, path: "/tiles/32.webp" },
  { id: 33, path: "/tiles/33.webp" },
  { id: 34, path: "/tiles/34.webp" },
];

export default function Home() {
  return (
    <div>
      <div className="w-full h-screen relative">
        <div className="absolute top-1/2 -translate-y-1/2 w-full text-white z-20 flex sm:flex-col flex-row-reverse justify-center items-center sm:gap-0 gap-2 sm:pr-0 pr-8">
          <h1 className="fade-in sm:text-center text-start font-bold sm:text-[clamp(0px,12vw,140px)] text-7xl sm:[writing-mode:_horizontal-tb] [writing-mode:_vertical-rl] tracking-widest">
            麻雀
            <br className="sm:hidden" />
            <span className="sm:pt-0 pt-8">ヤリタイ</span>
          </h1>
          <h2 className="sm:pt-0 pt-32 delayed-fade-in text-center font-semibold sm:text-[clamp(12px,10vw,32px)] sm:[writing-mode:_horizontal-tb] [writing-mode:_vertical-rl]">
            麻雀が好きな人が集まる場所
          </h2>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-[0.5] z-10"></div>
        <img
          src="/main-visual.webp"
          alt="新しく麻雀を始めたい人が集まる場所"
          className="w-full h-full object-cover contrast-125"
        />
      </div>

      <div className="mt-24 h-20 marquee-container">
        <div className="flex gap-3 marquee-inner">
          {tileImagePaths.map((obj, index) => {
            return (
              <div className="drop-shadow-lg" key={index}>
                <TileImage tile={obj.id} hover={false} />
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 marquee-inner">
          {tileImagePaths.map((obj, index) => {
            return (
              <div className="drop-shadow-lg" key={index}>
                <TileImage tile={obj.id} hover={false} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-6">
        <div className="lg:mt-24 mt-16 text-white relative">
          <img
            src="/bg-icon-1.webp"
            alt=""
            className="w-2/5 opacity-10 absolute inset-x-0 sm:-top-16 mx-auto -z-10"
          />
          <FadeInSection>
            <div>
              <h2 className="lg:text-6xl text-4xl font-bold">
                <span>麻雀が好きな人が集まる場所</span>
              </h2>
              <div className="mt-5 sm:text-xl text-lg">
                <p>
                  ｢麻雀ヤリタイ｣は、麻雀を愛する人が集まり、語らう場所です。
                </p>
                <p className="mt-2">
                  色んな人と最近の対局の話をしたり、好きなプロ雀士について語り合ったり、何切る問題を出し合ったり、日々の麻雀の成績を記録したり、一緒に麻雀をしたり！
                </p>
                <p className="mt-8">
                  また、「麻雀をやりたいけど難しそうだから始められていない。」という、「麻雀ハジメタイ」人が麻雀を始める助けになるような場所も目指しています。
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>

        <div className="lg:mt-40 mt-32 text-white">
          <FadeInSection>
            <div>
              <h2 className="lg:text-6xl text-3xl font-bold">はじめる</h2>
              <p className="mt-5 sm:text-xl text-lg">
                以下からお好きなコンテンツを選んで、お楽しみください！
              </p>
              <div className="mt-8 leading-loose">
                <ul className="mt-4 grid sm:grid-cols-2 grid-cols-1 gap-4 sm:text-[clamp(16px,2vw,20px)]">
                  <Link
                    to="/learning"
                    className="rounded hover:underline transition-all border-2 border-white"
                  >
                    <li className="flex justify-between items-center gap-1 py-4 px-6 h-full">
                      <div className="flex items-center gap-5">
                        <img
                          src="/beginner-icon.webp"
                          alt=""
                          className="w-10"
                        />
                        <span className="lg:text-2xl text-lg font-bold">
                          麻雀ハジメタイ
                        </span>
                      </div>
                      <FaAngleRight />
                    </li>
                  </Link>

                  <Link
                    to="/what-to-discard-problems"
                    className="rounded hover:underline transition-all border-2 border-white"
                  >
                    <li className="flex justify-between items-center gap-1 py-4 px-6 h-full">
                      <div className="flex items-center gap-5">
                        <GiThink size={40} color="white" />
                        <span className="lg:text-2xl text-lg font-bold">
                          何切る問題集
                        </span>
                      </div>
                      <FaAngleRight />
                    </li>
                  </Link>

                  <Link
                    to="/what-to-discard-problems"
                    className="rounded hover:underline transition-all border-2 border-white"
                  >
                    <li className="flex justify-between items-center gap-1 py-4 px-6 h-full">
                      <div className="flex items-center gap-5">
                        <RiArticleFill size={30} color="white" />
                        <span className="lg:text-2xl text-lg font-bold">
                          麻雀に関する記事
                        </span>
                      </div>
                      <FaAngleRight />
                    </li>
                  </Link>

                  <Link
                    to="/what-to-discard-problems"
                    className="rounded hover:underline transition-all border-2 border-white"
                  >
                    <li className="flex justify-between items-center gap-1 py-4 px-6 h-full">
                      <div className="flex items-center gap-5">
                        <BsGraphUpArrow size={30} color="white" />
                        <span className="lg:text-2xl text-lg font-bold">
                          戦績の記録
                        </span>
                      </div>
                      <FaAngleRight />
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}
