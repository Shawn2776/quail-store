"use client";

import { track } from "@vercel/analytics";
import { HatchCamPanel } from "./HatchCamPanel";

export function Hero() {
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
              className="bg-orange hover:bg-orange-dark transition-colors px-6 py-3 rounded-full font-bold text-black"
            >
              Shop table eggs
            </button>
            <a
              href="#hatchcam"
              onClick={() => track("Hero CTA Click", { button: "Watch the coop" })}
              className="border-2 border-white hover:bg-white hover:text-black transition-colors px-6 py-3 rounded-full font-bold inline-flex items-center"
            >
              Watch the coop
            </a>
          </div>
        </div>

        <HatchCamPanel />
      </div>
    </section>
  );
}
