import React from "react";
import imageOne from "../Assets/product-detail-1.PNG";
import imageTwo from "../Assets/product-detail-2.jpg";

import imageThree from "../Assets/product-detail-3.jpg";

function ProductDescription() {
  return (
    <div className="max-w-7xl mx-auto mt-20 mb-10 text-center  py-10">
      <h1 className="text-3xl font-extrabold text-mainTheme">
        HOW WE MADE OUR SHOES
      </h1>
      <p className="text-textColor text-lg md:text-xl mt-4 px-4 md:px-20 lg:px-40">
        Our shoes are crafted through a meticulous process, starting with
        premium leather selection, precise cutting, and expert stitching. Each
        pair undergoes careful shaping, lasting, and hand-finishing, ensuring
        durability, comfort, and timeless style that reflects true artisanal
        craftsmanship.
      </p>
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mt-10 ">
        <img
          className="w-[80vw] md:w-[70vw] lg:w-[25vw] xl:w-[30vw] h-[35vh] md:h-[50vh]"
          src={imageTwo}
          alt="image one"
        />
        <img
          className="w-[80vw] md:w-[70vw] lg:w-[25vw] xl:w-[30vw] h-[35vh] md:h-[50vh]"
          src={imageOne}
          alt="image one"
        />
        <img
          className=" w-[80vw] md:w-[70vw] lg:w-[25vw] xl:w-[30vw] h-[35vh] md:h-[50vh]"
          src={imageThree}
          alt="image one"
        />
      </div>
    </div>
  );
}

export default ProductDescription;
