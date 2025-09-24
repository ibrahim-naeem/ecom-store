import React, { useEffect } from "react";
import Lottie from "lottie-react";

import Slider from "../Components/Slider";
import FeaturedSection from "../Components/FeaturedSection";
import LatestProducts from "../Components/LatestProducts";

import divider from "../Assets/9Vidf1zfXK.json";
import ParallaxSection from "../Components/ParallaxSection";
import Footer from "../Components/Footer";
import ProductDetail from "../Components/ProductDetail";
import OurCategories from "../Components/OurCategories";

function Home() {
  useEffect(() => {});

  return (
    <div className="overflow-hidden">
      <Slider />
      <Lottie animationData={divider} loop={true} style={{ height: 100 }} />
      <FeaturedSection />
      <ParallaxSection />
      <Lottie animationData={divider} loop={true} style={{ height: 100 }} />
      {/* <LatestProducts /> */}
      <OurCategories />
      <Footer />
    </div>
  );
}

export default Home;
