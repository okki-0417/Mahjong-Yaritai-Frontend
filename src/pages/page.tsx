import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <div className="w-full h-[500px] relative">
        <div className="absolute top-1/2 -translate-y-1/2 w-full text-white z-20 flex sm:flex-col flex-row-reverse justify-center items-center sm:gap-0 gap-2 sm:pr-0 pr-8">
          <h1 className="fade-in sm:text-center text-start font-bold sm:text-[clamp(0px,12vw,140px)] text-7xl sm:[writing-mode:_horizontal-tb] [writing-mode:_vertical-rl] tracking-widest">
            麻雀<br className="sm:hidden" />
            <span className="sm:pt-0 pt-8">ヤリタイ</span>
          </h1>
          <h2 className="sm:pt-0 pt-32 delayed-fade-in text-center font-semibold sm:text-[clamp(12px,2vw,20px)] sm:[writing-mode:_horizontal-tb] [writing-mode:_vertical-rl]">
            麻雀をやりたい人たちが集まる場所です。
          </h2>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-[0.5] z-10"></div>
        <img src="./main-visual.jpg" alt="麻雀をやりたい人が語らう場所" className="w-full h-full object-cover contrast-125" />
      </div>

      <section className="mt-24 md:px-[20vw] px-6 text-slate-100">
        <h2 className="sm:text-5xl text-[clamp(24px,8vw,48px)] text-center font-bold">
          麻雀ヤリタイとは？
        </h2>
        <div className="mt-8 sm:text-xl leading-loose">
          <p>
            ここは、麻雀を愛する人たちが集まり、繋がれる場所です。
          </p>
          <p className="mt-4">
            最近の対局の話をしたり、好きなプロ雀士を語り合ったり、何切る問題を出し合ったり、日々の麻雀の成績を記録したり、一緒に麻雀をしたり！
          </p>
          <p className="mt-4">
            そして、これから麻雀を始める人や麻雀に興味がある人が、もっともっと麻雀の楽しさを感じることができるお手伝いができる場になることを目指しています。
          </p>
        </div>
      </section>

      <section className="mt-24 md:px-[20vw] px-6 text-slate-100">
        <h2 className="sm:text-5xl text-[clamp(24px,8vw,48px)] text-center font-bold">
          はじめる
        </h2>
        <div className="mt-8 leading-loose">
          <p className="sm:text-xl">
            ここでは麻雀に関する色々なことができます。
          </p>

          <ul className="mt-4 grid sm:grid-cols-2 grid-cols-1 gap-2 sm:text-[clamp(16px,2vw,20px)]">
            <Link to="/what-to-discard-problems" className="col-span1 py-5 px-4 border border-blue-700 hover:underline bg-slate-100 text-blue-700 rounded-sm">
              <li className="flex items-center gap-4">
                  <span>みんなの ｢何切る？｣</span>
                  <FaAngleRight />
              </li>
            </Link>
            <li className="col-span-1 py-5 px-4 border border-blue-700 hover:underline bg-slate-100 text-blue-700 rounded-sm">
              <span className="flex items-center gap-4 relative">
                <span className="line-through">成績の記録</span>
                <FaAngleRight />
                <span className="w-full absolute top-1/2 left-0 -translate-y-1/2 text-2xl text-center text-gray-800 font-bold bg-[rgba(241,245,249,0.5)]">Coming Soon...</span>
              </span>
            </li>
            <li className="col-span-1 py-5 px-4 border border-blue-700 hover:underline bg-slate-100 text-blue-700 rounded-sm">
              <span className="flex items-center gap-4 relative">
                <span className="line-through">麻雀チュートリアル</span>
                <FaAngleRight />
                <p className="w-full absolute top-1/2 left-0 -translate-y-1/2 text-2xl text-center text-gray-800 font-bold bg-[rgba(241,245,249,0.5)]">Coming Soon...</p>
              </span>
            </li>
            <li className="col-span-1 py-5 px-4 border border-blue-700 hover:underline bg-slate-100 text-blue-700 rounded-sm">
              <span className="flex items-center gap-4 relative">
                <span className="line-through">スレッド</span>
                <FaAngleRight />
                <p className="w-full absolute top-1/2 left-0 -translate-y-1/2 text-2xl text-center text-gray-800 font-bold bg-[rgba(241,245,249,0.5)]">Coming Soon...</p>
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
