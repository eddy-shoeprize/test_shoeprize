import Footer from "@/components/layout/Footer";
import { TabGroup } from "@/components/layout/tab/tab-group";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <TabGroup
        path="/today"
        items={[
          {
            text: "오늘마감",
          },
          // ...categories.map((x) => ({
          //   text: x.name,
          //   slug: x.slug,
          // })),
          { text: "오늘등록", slug: "todayNew" },
          { text: "관심상품", slug: "favorite" },
          { text: "참여함", slug: "participated" },
          { text: "발매완료", slug: "releaseDone" },
        ]}
      />
      <Suspense>{children}</Suspense>
      <Footer />
    </Suspense>
  );
}
