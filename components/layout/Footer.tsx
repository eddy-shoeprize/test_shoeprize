import Link from "next/link";

import { Suspense, useState } from "react";
import FooterMenu from "./FooterMenu";
import { Menu } from "./navbar";

export default async function Footer() {
  const COMPANY_NAME = "플래튼";
  const SITE_NAME = "슈프라이즈";

  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");

  const menu: Menu[] = [
    {
      title: "서비스이용약관",
      path: "/",
    },
    {
      title: "개인정보처리방침",
      path: "/",
    },
    {
      title: "사업제휴문의",
      path: "/",
    },
  ];

  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <FooterMenu menu={menu} />

        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 xl:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Designed in Shoeprize</p>
          <p className="md:ml-auto">
            Crafted by{" "}
            <a href="https://vercel.com" className="text-black dark:text-white">
              ▲ Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
