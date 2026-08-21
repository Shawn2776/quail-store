"use client";

import { track } from "@vercel/analytics";

export function AddToCartButton({ categoryName, variantLabel, price }) {
  return (
    <button
      onClick={() => track("Add to Cart", { category: categoryName, variant: variantLabel, price })}
      className="w-full bg-black hover:bg-orange transition-colors text-white font-bold text-sm py-3 rounded-full"
    >
      Add to cart
    </button>
  );
}
