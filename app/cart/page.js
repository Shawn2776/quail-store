"use client";

import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-display font-extrabold mb-3">Your cart is empty</h1>
        <p className="text-black/60 mb-6">Nothing here yet — go grab some eggs.</p>

        <a
          href="/"
          className="inline-block bg-black hover:bg-orange transition-colors text-white font-bold text-sm py-3 px-6 rounded-full"
        >
          Back to shop
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 py-12">
      <h1 className="text-2xl font-display font-extrabold mb-1">
        Your cart ({itemCount} item{itemCount === 1 ? "" : "s"})
      </h1>
      <p className="text-black/60 mb-8">Local pickup only — no shipping.</p>

      <div className="space-y-3 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 bg-white border border-grey-line rounded-xl p-4"
          >
            <div>
              <div className="font-semibold">{item.categoryName}</div>
              <div className="text-sm text-black/60">{item.label}</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-grey-line rounded-full">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center text-lg hover:bg-grey-bg rounded-l-full"
                  aria-label={`Decrease ${item.label} quantity`}
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-lg hover:bg-grey-bg rounded-r-full"
                  aria-label={`Increase ${item.label} quantity`}
                >
                  +
                </button>
              </div>

              <div className="w-16 text-right font-display font-extrabold text-orange">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-xs text-black/40 hover:text-red-600"
                aria-label={`Remove ${item.label}`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-grey-line pt-6">
        <div>
          <div className="text-sm text-black/60">Subtotal</div>
          <div className="text-2xl font-display font-extrabold">${subtotal.toFixed(2)}</div>
        </div>

        <a
          href="/checkout"
          className="bg-orange hover:bg-orange-dark transition-colors text-black font-bold text-sm py-3 px-8 rounded-full"
        >
          Checkout
        </a>
      </div>
    </div>
  );
}
