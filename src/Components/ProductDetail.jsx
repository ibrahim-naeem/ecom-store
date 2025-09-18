// ProductDetail.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LatestProducts from "./LatestProducts";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../database/supabase";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);

  const [mainImg, setMainImg] = useState(item?.images[0]);
  useEffect(() => {
    const getItemById = async (itemID) => {
      try {
        setLoading(true);
        let { data: product, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", itemID); // ✅ correct method
        // on start image placeholder not showing any selected image that's why setting it here..
        setMainImg(product[0]?.images[0]);
        setItem(product[0]);
        setLoading(false);
        console.log(product);
        if (error) console.error("Error", error);
      } catch (error) {
        console.error("Error ->", error);
      }
    };

    if (id) getItemById(id);
  }, [id]);

  // category

  if (loading)
    return <div className="absolute top-[50%] left-[50%]">Loading ... </div>;

  return (
    <section className="py-16 px-6  relative ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <img
            src={mainImg}
            alt={item?.name}
            className="w-full h-[400px] object-cover rounded-2xl shadow-md"
          />
          {/* Thumbnails */}
          <div className="flex gap-4 mt-6">
            {item?.images.map((img, i) => (
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-3xl font-bold mb-4">{item?.name}</h1>
          <p className="text-gray-600 mb-6">{item?.description}</p>
          <div className="flex items-center gap-2 mb-4 ">
            <p className="text-xl text-gray-600">Sizes : </p>
            {item?.sizes.map((size, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.85 }}
                className={`rounded-lg bg-gray-500 text-white w-10 flex justify-center p-3 `}
              >
                {size}
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <p className="text-xl text-gray-600">Colours : </p>
            {item?.color.map((curColor, i) => (
              <motion.div
                whileTap={{ scale: 0.85 }}
                key={i}
                style={{ backgroundColor: curColor }}
                className={`rounded-lg  text-white w-10 h-12 flex justify-center p-3 `}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-500 line-through">{item?.price}</span>

            <span className="text-green-600 font-bold text-xl">
              {item?.discountedPrice}
            </span>
            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
              {item?.discount}% OFF
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition">
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition"
            >
              Go to Cart
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
