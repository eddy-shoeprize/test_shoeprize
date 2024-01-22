"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { BannerProps } from "./banner";

export function Slider({ banners }: BannerProps) {
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
          {banner.title}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
