"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginUserMenuCheckBox() {
  const [checked, setChecked] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setChecked(false);
  }, [pathName]);

  return (
    <input
      type="checkbox"
      id="login-user-menu"
      className="peer hidden absolute top-4 right-4"
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
}
