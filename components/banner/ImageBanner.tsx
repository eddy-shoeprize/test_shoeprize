import Image from "next/image";
import { getHeroBanner, getHomeImageBanner } from "@/lib";

export default async function ImageBanner() {
  const { banners } = await getHomeImageBanner();
  return (
    <div>
      {banners?.map((banner) => (
        <div key={banner.id}>
          <Image
            alt={banner.title}
            src={banner.webImage}
            width={2200}
            height={200}
          ></Image>
        </div>
      ))}
    </div>
  );
}
