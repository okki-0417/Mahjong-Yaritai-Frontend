import { ReactNode } from "react";

export default function DefaultFormLayout({children}: {children: ReactNode }) {
  return (
    <div className="lg:w-1/2 mx-auto bg-white py-8 lg:px-16 px-4  mt-16 rounded-md text-gray-700">
        {children}
    </div>
  )
}
