"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { useCart } from "@/components/CartProvider";

export function AddToCartButton({ id, categoryId, categoryName, label, price }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    addItem({ id, categoryId, categoryName, label, price });
    track("Add to Cart", { category: categoryName, variant: label, price });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-black hover:bg-orange transition-colors text-white font-bold text-sm py-3 rounded-full"
    >
      {justAdded ? "Added ✓" : "Add to cart"}
    </button>
  );
}
