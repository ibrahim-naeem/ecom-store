// Slider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import bg1 from "../Assets/image1.jpeg";
import bg2 from "../Assets/bg-test.JPEG";
import bg3 from "../Assets/bg-image.JPEG";

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      img: bg3,
      // heading: "Discover Nature",
      // text: "Experience the beauty of untouched landscapes.",
    },
    {
      img: bg1,
      // heading: "Discover Nature",
      // text: "Experience the beauty of untouched landscapes.",
    },
    {
      img: bg2,
      // heading: "Discover Nature",
      // text: "Experience the beauty of untouched landscapes.",
    },
    {
      img: "https://picsum.photos/id/1020/1600/900",
      // heading: "Peaceful Escape",
      // text: "Find serenity in quiet corners of the world.",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        effect="fade"
        speed={1000}
        className="h-[90vh]"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-full  bg-no-repeat bg-center bg-cover  relative"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* <img
              src={slide.img}
              alt="bg-image"
              className="h-full  bg-no-repeat bg-center bg-contain relative"
            /> */}

              {/* Dark overlay */}
              {/* <div className="absolute inset-0 bg-black/50"></div> */}

              {/* Text */}
              <div className="relative z-5 h-full flex flex-col justify-center items-start px-6 sm:px-12">
                <motion.h2
                  initial={{ x: -100, opacity: 0 }}
                  animate={
                    activeIndex === i
                      ? { x: 0, opacity: 1 }
                      : { x: -100, opacity: 0 }
                  }
                  transition={{ duration: 0.8 }}
                  className="ml-4 sm:ml-12 text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
                >
                  {slide.heading}
                </motion.h2>

                <motion.p
                  initial={{ x: -100, opacity: 0 }}
                  animate={
                    activeIndex === i
                      ? { x: 0, opacity: 1 }
                      : { x: -100, opacity: 0 }
                  }
                  transition={{ duration: 1, delay: 0.3 }}
                  className="ml-4 sm:ml-12 max-w-md text-sm sm:text-base lg:text-lg text-white"
                >
                  {slide.text}
                </motion.p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles */}
      <style>{`
        /* White arrows (hidden on small devices) */
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }

        /* White pagination bullets */
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
