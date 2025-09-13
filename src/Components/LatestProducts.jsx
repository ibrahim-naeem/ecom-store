import { useNavigate } from "react-router";

export default function LatestProducts({ heading }) {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      img: "https://picsum.photos/500/400?random=1",
      title: "Premium ",
      details: "Smooth flavor with rich smoke",
      price: "Rs. 4,000",
      discountPrice: "Rs. 3,200",
      off: "20% OFF",
    },
    {
      id: 2,
      img: "https://picsum.photos/500/400?random=2",
      title: "Classic ",
      details: "Durable and stylish design",
      price: "Rs. 3,500",
      discountPrice: "Rs. 2,800",
      off: "20% OFF",
    },
    {
      id: 3,
      img: "https://picsum.photos/500/400?random=3",
      title: "Pro  Kit",
      details: "Includes all accessories",
      price: "Rs. 6,000",
      discountPrice: "Rs. 4,500",
      off: "25% OFF",
    },
    {
      id: 4,
      img: "https://picsum.photos/500/400?random=4",
      title: "Flavored Pod",
      details: "Refreshing fruity taste",
      price: "Rs. 1,500",
      discountPrice: "Rs. 1,200",
      off: "20% OFF",
    },
    {
      id: 5,
      img: "https://picsum.photos/500/400?random=5",
      title: "Slim ",
      details: "Compact and portable",
      price: "Rs. 2,800",
      discountPrice: "Rs. 2,200",
      off: "22% OFF",
    },
    {
      id: 6,
      img: "https://picsum.photos/500/400?random=6",
      title: "Luxury ",
      details: "Premium build quality",
      price: "Rs. 7,000",
      discountPrice: "Rs. 5,250",
      off: "25% OFF",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            {heading ? heading : "Latest Products"}
          </h2>
          <p className="text-gray-600 mt-2">
            Discover our newest arrivals with exclusive discounts.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl flex flex-col"
            >
              <div className="relative">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.off}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.details}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-gray-500 line-through">
                      {product.price}
                    </span>
                    <span className="text-green-600 font-bold">
                      {product.discountPrice}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/productDetail")}
                  className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="px-6 py-3 bg-gray-600 text-white rounded-xl shadow-md transition-all duration-500 hover:bg-gray-800 hover:scale-105">
          View All Products
        </button>
      </div>
    </section>
  );
}
