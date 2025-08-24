"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function HamburgerCheckBox() {
  const [checked, setChecked] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setChecked(false);
  }, [pathName]);

  return (
    <input
      type="checkbox"
      id="hamburger"
      className="peer hidden absolute top-4 right-4"
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
}
