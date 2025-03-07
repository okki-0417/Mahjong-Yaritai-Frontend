import { BsGraphUpArrow } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { GiThink } from "react-icons/gi";
import { MdOutlineQuestionMark } from "react-icons/md";
import { RiArticleFill } from "react-icons/ri";
import { Link } from "react-router";
import FadeInSection from "../hooks/useFadeIn";

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
          <h2 className="sm:pt-0 pt-32 delayed-fade-in text-center font-semibold sm:text-[clamp(12px,2vw,20px)] sm:[writing-mode:_horizontal-tb] [writing-mode:_vertical-rl]">
            麻雀をやりたい人たちが集まる場所。
          </h2>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-[0.5] z-10"></div>
        <img
          src="/main-visual.webp"
          alt="麻雀をやりたい人が語らう場所"
          className="w-full h-full object-cover contrast-125"
        />
      </div>

      <div className="md:px-[20vw] px-6">
        <div className="mt-40 text-white">
          <FadeInSection>
            <div>
              <h2 className="text-6xl font-bold">麻雀ヤリタイとは</h2>
              <div className="mt-16 sm:text-xl">
                <p>
                  ｢麻雀ヤリタイ｣
                  は、麻雀を愛する人たちが集まり、繋がれる場所です。
                </p>
                <p className="mt-4">
                  色んな人と最近の対局の話をしたり、好きなプロ雀士を語り合ったり、何切る問題を出し合ったり、日々の麻雀の成績を記録したり、一緒に麻雀をしたり！
                </p>
                <p className="mt-4">
                  そして、これから麻雀を始める人や麻雀に興味がある人に、もっともっと麻雀の楽しさを感じることができる場になることを目指しています。
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>

        <div className="mt-40 text-white">
          <FadeInSection>
            <div>
              <h2 className="text-5xl font-bold">はじめる</h2>
              <p className="mt-5 sm:text-xl">
                以下からお好きなコンテンツを選んで、お楽しみください！
              </p>
              <div className="mt-8 leading-loose">
                <ul className="mt-4 grid sm:grid-cols-2 grid-cols-1 gap-4 sm:text-[clamp(16px,2vw,20px)]">
                  <Link
                    to="/what-to-discard-problems"
                    className="rounded-semi hover:underline transition-all border-2 border-white"
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
                    className="rounded-semi hover:underline transition-all border-2 border-white"
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
                    className="rounded-semi hover:underline transition-all border-2 border-white"
                  >
                    <li className="flex justify-between items-center gap-1 py-4 px-6 h-full">
                      <div className="flex items-center gap-5">
                        <MdOutlineQuestionMark size={30} color="white" />
                        <span className="lg:text-2xl text-lg font-bold">
                          麻雀のルール・遊び方
                        </span>
                      </div>
                      <FaAngleRight />
                    </li>
                  </Link>
                  <Link
                    to="/what-to-discard-problems"
                    className="rounded-semi hover:underline transition-all border-2 border-white"
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
