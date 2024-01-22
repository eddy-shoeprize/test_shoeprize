import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./MobileMenu";
import User from "@/components/user";
import Avatar from "@/components/user/Avatar";
import Search from "./Search";

export type Menu = {
  title: string;
  path: string;
};

export default function Navbar() {
  const menu: Menu[] = [
    {
      title: "홈",
      path: "/",
    },
    {
      title: "투데이",
      path: "/",
    },
    {
      title: "컬처",
      path: "/",
    },
    {
      title: "둘러보기",
      path: "/",
    },
    {
      title: "이벤트",
      path: "/",
    },
  ];

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>

      <div className="flex w-full items-center">
        <div className="flex w-full md:w-2/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              shoeprize
            </div>
          </Link>

          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>

        <div className="flex justify-end ml-2">
          <Suspense>
            <Avatar />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
