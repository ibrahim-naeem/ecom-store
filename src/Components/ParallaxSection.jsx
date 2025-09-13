export default function ParallaxGlassSection() {
  const cards = [
    "Innovative Solutions",
    "Trusted Partnerships",
    "Cutting-Edge Tech",
    // "Customer First",
  ];

  return (
    <section
      className="relative h-[100vh] flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Grid of glassy cards */}
      <div
        className={`relative grid gap-8 px-6 max-w-6xl w-full ${
          cards.length === 3
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
        }`}
      >
        {cards.map((title, i) => (
          <div
            key={i}
            className="p-8 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 text-white text-center hover:scale-105 transition-transform duration-500"
          >
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-sm leading-relaxed text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
              repellendus. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Maxime, repellendus. Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
