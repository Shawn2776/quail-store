"use client";

import { track } from "@vercel/analytics";
import { featuredProduct } from "@/lib/data";

export function FeaturedProduct() {
  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div className="bg-grey-bg rounded-2xl flex items-center justify-center h-64 md:h-80">
            <div className="text-7xl">🥚</div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-turquoise-dark uppercase tracking-wide mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-turquoise" />
              In stock — local pickup
            </span>

            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-3">{featuredProduct.name}</h2>

            <p className="text-black/60 text-lg max-w-[52ch] mb-8">{featuredProduct.description}</p>

            <div className="grid grid-cols-2 gap-4 max-w-lg mb-4">
              <div className="border border-grey-line rounded-xl p-5 hover:border-black transition-colors">
                <div className="text-sm font-semibold mb-1">Half dozen</div>
                <div className="text-3xl font-display font-extrabold text-orange mb-4">$4.00</div>
                <button
                  onClick={() => track("Add to Cart", { variant: "Half dozen", price: 4.0 })}
                  className="w-full bg-black hover:bg-orange transition-colors text-white font-bold text-sm py-3 rounded-full"
                >
                  Add to cart
                </button>
              </div>

              <div className="border border-grey-line rounded-xl p-5 hover:border-black transition-colors">
                <div className="text-sm font-semibold mb-1">Full dozen</div>
                <div className="text-3xl font-display font-extrabold text-orange mb-4">$7.00</div>
                <button
                  onClick={() => track("Add to Cart", { variant: "Full dozen", price: 7.0 })}
                  className="w-full bg-black hover:bg-orange transition-colors text-white font-bold text-sm py-3 rounded-full"
                >
                  Add to cart
                </button>
              </div>
            </div>

            <p className="text-sm text-black/50">Local pickup only — no shipping at this time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
