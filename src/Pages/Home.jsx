import React from "react";
import Lottie from "lottie-react";

import Slider from "../Components/Slider";
import FeaturedSection from "../Components/FeaturedSection";
import LatestProducts from "../Components/LatestProducts";

import divider from "../Assets/9Vidf1zfXK.json";
import ParallaxSection from "../Components/ParallaxSection";
import Footer from "../Components/Footer";
import ProductDetail from "../Components/ProductDetail";

function Home() {
  return (
    <div>
      <Slider />
      <Lottie animationData={divider} loop={true} style={{ height: 100 }} />
      <FeaturedSection />
      <ParallaxSection />
      <Lottie animationData={divider} loop={true} style={{ height: 100 }} />
      <LatestProducts />
      <Footer />
    </div>
  );
}

export default Home;
