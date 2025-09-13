// ProductDetail.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import LatestProducts from "./LatestProducts";

export default function ProductDetail() {
  const product = {
    title: "Premium Vape Kit",
    description:
      "Experience smooth flavors with a stylish design. Includes all essential accessories for an amazing experience.",
    price: "Rs. 6,000",
    discountPrice: "Rs. 4,500",
    off: "25% OFF",
    images: [
      "https://picsum.photos/600/500?random=1",
      "https://picsum.photos/600/500?random=2",
      "https://picsum.photos/600/500?random=3",
    ],
  };

  const [mainImg, setMainImg] = useState(product.images[0]);

  return (
    <section className="py-16 px-6  relative top-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <img
            src={mainImg}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-2xl shadow-md"
          />
          {/* Thumbnails */}
          <div className="flex gap-4 mt-6">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setMainImg(img)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition ${
                  mainImg === img ? "border-gray-600" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-500 line-through">{product.price}</span>
            <span className="text-green-600 font-bold text-xl">
              {product.discountPrice}
            </span>
            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
              {product.off}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">
              Add to Cart
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-500 transition">
              Buy Now
            </button>
          </div>
        </motion.div>
      </div>
      <LatestProducts heading="Related Products" />
    </section>
  );
}
