export function Hero() {
  return (
    <section className="bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
        <div>
          <div className="font-semibold text-sm text-orange uppercase tracking-wide mb-3">
            Small batch · Coturnix quail
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">
            Fresh quail eggs, <em className="italic">gathered this morning.</em>
          </h1>
          <p className="text-white/70 text-lg max-w-[42ch] mb-7">
            We keep a small backyard flock and sell what they lay — nothing shipped, nothing sitting in a warehouse.
            Order online, pick up at the coop.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button className="bg-orange hover:bg-orange-dark transition-colors px-6 py-3 rounded-full font-bold text-black">
              Shop table eggs
            </button>
            <a
              href="#hatchcam"
              className="border-2 border-white hover:bg-white hover:text-black transition-colors px-6 py-3 rounded-full font-bold inline-flex items-center"
            >
              Watch the coop
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/15 aspect-[4/3] flex items-center justify-center">
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-turquoise animate-pulse" />
            HATCH CAM
          </div>
          <div className="text-center px-8">
            <div className="text-5xl mb-3">📷</div>
            <p className="text-white/60 text-sm max-w-[26ch] mx-auto">
              Camera isn&apos;t hooked up yet — check back soon for a live look at the coop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
