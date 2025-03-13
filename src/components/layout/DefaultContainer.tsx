import { ReactNode } from "react";

export default function DefaultContainer({
  children,
  heading,
}: {
  children: ReactNode;
  heading: string;
}) {
  return (
    <div className="max-w-4xl lg:mx-auto mx-4 mt-36">
      <h1 className="lg:text-5xl text-xl mt-12 font-bold">{heading}</h1>
      <hr className="mt-3 mb-20" />
      {children}
    </div>
  );
}
