import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import loginSvg from "../Assets/login.svg";
import { supabase } from "../database/supabase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const signInWithMagicLink = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        redirectTo: "http://localhost:5173",
      },
    });

    setLoading(true);
    if (error) {
      setLoading(false);
      console.error("Error sending magic link:", error.message);
      toast.error("Failed to send magic link. Please try again.");
    } else {
      setLoading(false);
      toast.success("Check your email for the magic link!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) return new Error("Email is required");
    await signInWithMagicLink(email);
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="h-[100vh]  flex flex-col sm:flex-row">
      <div className="flex w-full h-[40vh] sm:h-full bg-gray-200 items-center justify-center p-10">
        <img src={loginSvg} alt="Ecommerce Illustration" className="w-3/4" />
      </div>

      <div className="flex flex-col justify-center w-full h-[50vh] sm:h-full  px-8 md:px-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome 👋</h2>
        <p className="text-gray-500 mb-8">Login to continue shopping</p>

        <div>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 mb-10 border-b border-gray-300 focus:outline-none "
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          onClick={(e) => handleLogin(e)}
          className="w-full py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-md hover:bg-gray-600 transition"
        >
          Login
        </motion.button>
      </div>
    </div>
  );
}
