import Footer from "@/components/layout/Footer";
import { TabGroup } from "@/components/layout/tab/tab-group";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <TabGroup
        path="/ranks"
        items={[
          {
            text: "슈프라이즈",
          },
          // ...categories.map((x) => ({
          //   text: x.name,
          //   slug: x.slug,
          // })),
          { text: "크림", slug: "kream" },
          { text: "솔드아웃", slug: "soldout" },
          { text: "스탁엑스", slug: "stockx" },
        ]}
      />
      <Suspense>{children}</Suspense>
      <Footer />
    </Suspense>
  );
}
