import Navbar from "@/components/layout/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ensureStartsWith } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME = "슈프라이즈" } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3001";
const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, "@")
  : undefined;
const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, "https://")
  : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME || "슈프라이즈",
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: "summary_large_image",
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    tag: string;
    rank: string;
  };
}) {
  console.log("eddy ??^^^", params);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
