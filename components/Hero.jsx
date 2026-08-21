"use client";

import { track } from "@vercel/analytics";

const btnBase = "font-semibold text-[0.96rem] px-6 py-3 rounded-full border transition-colors";

export function Hero({ hatchCamSlot }) {
  return (
    <section className="bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
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
            <button
              onClick={() => track("Hero CTA Click", { button: "Shop table eggs" })}
              className={`${btnBase} bg-orange hover:bg-orange-dark text-black border-transparent`}
            >
              Shop table eggs
            </button>

            <a
              href="#hatchcam"
              onClick={() => track("Hero CTA Click", { button: "Watch the coop" })}
              className={`${btnBase} border-white hover:bg-white hover:text-black inline-flex items-center`}
            >
              Watch the coop
            </a>
          </div>
        </div>

        {hatchCamSlot}
      </div>
    </section>
  );
}
