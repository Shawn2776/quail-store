import { featuredProduct } from "@/lib/data";

export function FeaturedProduct() {
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl mb-6">Available now</h2>

        <div className="border border-grey-line rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[380px_1fr]">
          <div className="bg-grey-bg flex items-center justify-center p-10 aspect-square md:aspect-auto">
            <div className="text-6xl">🥚</div>
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-turquoise-dark uppercase tracking-wide mb-2 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-turquoise" />
              In stock — local pickup
            </span>

            <h3 className="text-2xl md:text-3xl font-display font-extrabold mb-2">{featuredProduct.name}</h3>

            <p className="text-black/60 max-w-[52ch] mb-6">{featuredProduct.description}</p>

            <div className="grid grid-cols-2 gap-3 max-w-md mb-2">
              {featuredProduct.variants.map((variant) => (
                <div
                  key={variant.label}
                  className="border border-grey-line rounded-xl p-4 hover:border-black transition-colors"
                >
                  <div className="text-sm font-semibold mb-1">{variant.label}</div>
                  <div className="text-2xl font-display font-extrabold text-orange mb-3">
                    ${variant.price.toFixed(2)}
                  </div>
                  <button className="w-full bg-black hover:bg-orange transition-colors text-white font-bold text-sm py-2.5 rounded-full">
                    Add to cart
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-black/50 mt-4">Local pickup only — no shipping at this time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
