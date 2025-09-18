import { useState } from "react";
import { motion } from "motion/react";
import { Camera } from "lucide-react";

import { supabase } from "../../database/supabase.js";

function AddProduct() {
  const [hexColor, setHexColor] = useState("");
  const [footSize, setfootSize] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    color: [],
    discount: "",
    discountedPrice: "",
    sizes: [],
    description: "",
    images: [],
    category: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");

  const categoriesName = ["Oxford", "Derby", "Monk Strap", "Loafers"];

  //   const validateForm = () => {
  //     const { name, reviewDetail, images } = formData;
  //     if (!name || !reviewDetail) {
  //       toast.error("Name, and Review Detail are required.");
  //       return false;
  //     }
  //     if (!images || images.length === 0) {
  //       toast.error("Please upload at least one image.");
  //       return false;
  //     }
  //     return true;
  //   };

  const uploadImagesToSupabase = async (files) => {
    const uploadedUrls = [];
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (error) {
        console.error("Image upload error:", error.message);
        // toast.error("Failed to upload one or more images.");
      } else {
        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);
        uploadedUrls.push(data.publicUrl);
      }
    }
    return uploadedUrls;
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    console.log("Form Data :", formData, hexColor);
    setFormData({
      name: "",
      price: "",
      color: [],
      discount: "",
      discountedPrice: "",
      sizes: [],
      description: "",
      images: [],
      category: "",
    });

    //     if (!validateForm()) return;
    const {
      name,
      price,
      color,
      discount,
      discountedPrice,
      sizes,
      description,
      images,
      category,
    } = formData;
    setLoading(true);
    try {
      const uploadedUrls = await uploadImagesToSupabase(images);
      const { error } = await supabase.from("products").insert([
        {
          name,
          price,
          color,
          discount,
          discountedPrice,
          sizes,
          description,
          images: uploadedUrls,
          category,
        },
      ]);

      if (error) {
        console.error("DB insert error:", error);
        // toast.error("Failed to submit the review.");
      } else {
        // toast.success("Review submitted successfully!");
        setFormData({
          name: "",
          price: "",
          color: [],
          discount: "",
          discountedPrice: "",
          sizes: [],
          description: "",
          images: [],
          category: "",
        });
        setImages([]);
      }
    } catch (err) {
      console.log("Submit Error:", err);
      // toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  //   if (formData.discount !== "") {
  //     let price = Number(formData.price);
  //     let discount = Number(formData.discount);
  //     let newPrice = price - (price * discount) / 100;

  //     setFormData((prev) => {
  //       const updated = { ...prev, discountedPrice: newPrice };
  //       console.log("Updated formData:", updated);
  //       return updated;
  //     });
  //   }
  // };

  const setColors = () => {
    if (!hexColor) return;

    setFormData((prev) => ({
      ...prev,
      color: [...prev.color, hexColor],
    }));

    setHexColor("");
  };

  const setSize = () => {
    if (!footSize) return;

    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, footSize],
    }));

    setfootSize("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (hexColor[0]) {
        updated.color.push(hexColor[0]);
      }
      if (updated.price && updated.discount !== "") {
        const price = Number(updated.price);
        const discount = Number(updated.discount);
        const newPrice = price - (price * discount) / 100;
        updated.discountedPrice = newPrice;
      }

      console.log("Updated formData:", updated);
      return updated;
    });
  };

  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Check total limit
    if (images.length + selectedFiles.length > 5) {
      console.error("You can only upload a maximum of 5 images.");
      return;
    }

    const updatedImages = [...images, ...selectedFiles];
    setImages(updatedImages);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="  w-[85vw] bg-white flex flex-col justify-center mx-auto gap-4 "
    >
      <h2 className="text-2xl font-bold  text-gray-600">Add a Product</h2>
      <p>Add product details below.</p>
      <section className="flex  w-full   gap-4">
        <section className=" flex flex-col w-full gap-6">
          <motion.input
            type="text"
            name="name"
            placeholder="Product name"
            className="p-3 w-full  max-w-2xl focus:outline-none leading-6 border-b border-gray-300"
            onChange={handleChange}
          />

          <motion.input
            type="text"
            name="price"
            placeholder="Add Price"
            className="p-3 w-full  max-w-2xl focus:outline-none leading-6 border-b border-gray-300"
            onChange={handleChange}
          />
          <motion.input
            type="text"
            name="discount"
            placeholder="Add discount - (if any)"
            className="p-3 w-full  max-w-2xl focus:outline-none leading-6 border-b border-gray-300"
            onChange={handleChange}
          />

          <div className="flex items-center max-w-2xl">
            <motion.input
              type="text"
              name="color"
              placeholder="Add colours"
              onChange={(e) => setHexColor(e.target.value)}
              className="p-3 w-full focus:outline-none leading-6 border-b border-gray-300"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={setColors}
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-xl w-50"
            >
              Add Colours
            </motion.button>
          </div>
          <div className="flex gap-1 max-w-2xl">
            {formData.color.map((curColor, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={i}
                style={{ backgroundColor: curColor }}
                className={`rounded-lg  text-white w-10 flex justify-center p-3 `}
              />
            ))}
          </div>

          <div className="w-full max-w-2xl flex flex-col  gap-2">
            <label className="cursor-pointer flex justify-center gap-2 text-white px-4 py-2 rounded-xl  bg-gray-500 ">
              <Camera size={20} /> Add Images
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            {images.length > 0 && (
              <div className="flex justify-center items-center relative h-10 w-full">
                {images.map((img, index) => {
                  const totalWidth = images.length * 20;
                  const centerOffset = totalWidth / 2;
                  const imgUrl = URL.createObjectURL(img);
                  return (
                    <motion.img
                      key={index}
                      src={imgUrl}
                      alt="preview"
                      className="w-10 h-10 object-cover rounded-lg shadow-lg"
                      style={{
                        position: "absolute",
                        left: `calc(50% - ${centerOffset}px + ${index * 20}px)`,
                        zIndex: images.length - index,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onLoad={() => URL.revokeObjectURL(imgUrl)} // Clean up
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className=" flex flex-col w-full gap-4">
          <div className="flex items-center max-w-2xl">
            <motion.input
              type="text"
              name="sizes"
              placeholder="Add sizes"
              onChange={(e) => setfootSize(e.target.value)}
              className="p-3 w-full focus:outline-none leading-6 border-b border-gray-300"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={setSize}
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-xl w-50"
            >
              Add Sizes
            </motion.button>
          </div>
          <div className="flex gap-1 max-w-2xl">
            {formData.sizes.map((curSize, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={i}
                className={`rounded-lg bg-gray-300 text-white w-10 flex justify-center p-3 `}
              >
                {curSize}
              </motion.div>
            ))}
          </div>
          <motion.textarea
            name="description"
            value={formData.reviewDetail}
            placeholder="Add product description"
            className="p-3 rounded-xl w-full max-w-2xl focus:outline-none leading-6 border border-gray-300 min-h-[135px]"
            onChange={handleChange}
          />
          <div>
            <p>Please select the product category below :</p>
            <p className="text-lg text-gray-700 p-2">{formData.category}</p>
            {categoriesName.map((item, index) => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={index}
                name="category"
                value={item} // ✅ important
                onClick={handleChange}
                className="bg-gray-500 rounded-full p-4 m-2 text-white"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </section>
      </section>

      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={loading}
        className={`text-white p-3 rounded-4xl w-full  font-semibold ${
          loading ? "bg-gray-300" : "bg-gray-500"
        }`}
        onClick={handleFormData}
      >
        {loading ? "Submitting..." : "Submit"}
      </motion.button>
    </motion.div>
  );
}

export default AddProduct;
