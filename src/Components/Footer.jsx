import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className=" bg-gray-600 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-start"
        >
          <h1 className="text-2xl font-bold mb-4">MyStore</h1>
          <p className="text-sm text-gray-200">
            Bringing you the best products with premium quality and customer
            satisfaction in mind.
          </p>
        </motion.div>

        {/* Nav Links 1 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg font-semibold mb-4">Shop</h2>
          <ul className="space-y-2 text-gray-200">
            <li>
              <a href="#">New Arrivals</a>
            </li>
            <li>
              <a href="#">Best Sellers</a>
            </li>
            <li>
              <a href="#">Discounts</a>
            </li>
            <li>
              <a href="#">Categories</a>
            </li>
          </ul>
        </motion.div>

        {/* Nav Links 2 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg font-semibold mb-4">Support</h2>
          <ul className="space-y-2 text-gray-200">
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Shipping & Returns</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </motion.div>

        {/* Subscribe */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
          <p className="text-sm text-gray-200 mb-3">
            Get the latest news and special offers straight to your inbox.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-md w-full text-black bg-white"
            />
            <button className="bg-gray-800 px-4 py-2 rounded-r-md hover:bg-gray-900 transition">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-500 pt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}
