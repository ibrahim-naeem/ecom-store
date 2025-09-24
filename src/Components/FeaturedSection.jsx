import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedSection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className=" bg-white py-16 text-mainTheme  ">
      <div className="max-w-7xl mx-auto px-4 text-center ">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4"
        >
          Premium Collection
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-textColor mb-12"
        >
          Discover our handpicked selection of products that combine style,
          quality, and functionality. Each piece is designed to bring value to
          your everyday life with premium materials and thoughtful details.
        </motion.p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          // navigation
          // pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="pb-10"
        >
          {[1, 2, 3, 4, 5].map((item) => (
            <SwiperSlide key={item}>
              <motion.div
                // variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: item * 0.2 }}
                className="rounded-2xl shadow-xl overflow-hidden flex flex-col h-full"
              >
                <div className="overflow-hidden">
                  <img
                    src={`https://picsum.photos/400/300?random=${item}`}
                    alt={`Product ${item}`}
                    className="w-full h-64 object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow text-center">
                  <h3 className="text-xl font-semibold mb-3">Product {item}</h3>
                  <p className="text-textColor mb-6 flex-grow">
                    A short description about this product highlighting its
                    features and benefits for customers.
                  </p>
                  <button className="mt-auto bg-mainTheme text-textColor py-2 px-4 rounded-lg transition duration-300">
                    View Details
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedSection;
