"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import Image from "next/image";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import { Banner } from "@/lib/types";
export const Slider: React.FC<{ banners: Banner[] }> = ({ banners }) => {
  return (
    <Swiper
      pagination={{
        type: "fraction",
      }}
      navigation={true}
      autoplay={{ delay: 2000 }}
      modules={[Pagination, Navigation, Autoplay]}
      className=" flex items-center justify-center h-28"
    >
      {banners?.map((banner) => (
        <SwiperSlide key={banner.id} className=" p-4 rounded-md">
          <Link href={banner.url}>
            <Image
              alt={banner.title}
              src={banner.webImage}
              width={800}
              height={800}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
