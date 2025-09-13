import { motion } from "framer-motion";

const FeaturedSection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className=" bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4"
        >
          Featured Products
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-gray-600 mb-12"
        >
          Discover our handpicked selection of products that combine style,
          quality, and functionality. Each piece is designed to bring value to
          your everyday life with premium materials and thoughtful details.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: item * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
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
                <p className="text-gray-600 mb-6 flex-grow">
                  A short description about this product highlighting its
                  features and benefits for customers.
                </p>
                <button className="mt-auto bg-gray-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
