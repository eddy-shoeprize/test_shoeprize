import { getHomeRoundShortCutBanner } from "@/lib";
import Image from "next/image";

export default async function RoundShortCutBanner() {
  const { banners } = await getHomeRoundShortCutBanner();

  return (
    <div className="flex items-center justify-center gap-10">
      {banners?.map((banner: any) => (
        <div key={banner.id} className="flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden bg-black">
            <Image
              alt={banner.title}
              src={banner.webImage}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <span className="mt-2 text-black">{banner.title}</span>
        </div>
      ))}
    </div>
  );
}
