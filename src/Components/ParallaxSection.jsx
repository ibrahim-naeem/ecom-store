import image from "../Assets/bg-parallax.PNG";

export default function ParallaxGlassSection() {
  const cards = [
    {
      title: "The Art of Patina",
      description: `The Art of Patina is the mastery of hand-dyeing leather, creating unique depth and character
        Each shade evolves with time, reflecting individuality, craftsmanship, and timeless elegance in every piece.`,
    },
    {
      title: "Bespoke Creation",
      description: `Bespoke Creation shoes represent individuality and craftsmanship. Each pair is carefully handcrafted, tailored to your style, blending comfort, elegance, and uniqueness, ensuring footwear that truly reflects your personal story.`,
    },
    {
      title: "Norwegien Stiching",
      description: `Norwegian Stitching is a traditional shoemaking technique known for strength and durability. Its double-stitch construction provides waterproofing, rugged charm, and timeless style, making shoes both highly functional and beautifully crafted.`,
    },
  ];

  return (
    <section
      className="relative h-[100vh] w-[100vw] flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Grid of glassy cards */}
      <div
        className={`relative grid gap-8 px-6 max-w-6xl w-full ${
          cards.length === 3
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
        }`}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="p-8 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 text-white text-center hover:scale-105 transition-transform duration-500"
          >
            <h2 className="text-2xl font-bold mb-4 text-textColor">
              {card?.title}
            </h2>
            <p className="text-sm leading-relaxed text-textColor">
              {card?.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
