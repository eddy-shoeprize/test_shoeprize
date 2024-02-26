import Footer from "@/components/layout/Footer";
import SideNaveBar from "@/components/layout/mypage/SideNaveBar";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <SideNaveBar />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          {children}
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
