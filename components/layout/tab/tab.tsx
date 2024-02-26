"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Item } from "./tab-group";

export const Tab = ({ path, item }: { path: string; item: Item }) => {
  const segment = useSelectedLayoutSegment();
  console.log("eddysegment ", segment);

  const href = item.slug ? path + "/" + item.slug : path;

  console.log("eddy href", href);
  const isActive =
    // Example home pages e.g. `/layouts`
    (!item.slug && segment === null) ||
    segment === item.segment ||
    // Nested pages e.g. `/layouts/electronics`
    segment === item.slug;

  return (
    <Link href={href} style={{ color: isActive ? "red" : undefined }}>
      {item.text}
    </Link>
  );
};
