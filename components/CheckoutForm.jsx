"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useCart } from "@/components/CartProvider";
import { createCheckoutSession, createPickupOrder } from "@/app/checkout/actions";

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const { isSignedIn, user } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress ?? "");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(method) {
    setError("");

    if (!email || (!isSignedIn && !name)) {
      setError("Please fill in your name and email.");
      return;
    }

    setIsSubmitting(true);

    const customerInfo = { name, email, phone };

    try {
      if (method === "stripe") {
        const { url } = await createCheckoutSession(items, customerInfo);
        clearCart();
        window.location.href = url;
      } else {
        const { orderId } = await createPickupOrder(items, customerInfo);
        clearCart();
        window.location.href = `/order-confirmation?order=${orderId}`;
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-[600px] mx-auto px-4 py-12">
      <h1 className="text-2xl font-display font-extrabold mb-1">Checkout</h1>
      <p className="text-black/60 mb-8">Local pickup only — no shipping.</p>

      <div className="bg-white border border-grey-line rounded-xl p-5 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-2">
            <span>
              {item.categoryName} — {item.label} × {item.quantity}
            </span>
            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-display font-extrabold text-lg pt-3 mt-3 border-t border-grey-line">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-white border border-grey-line rounded-xl p-5 mb-6 space-y-4">
        {!isSignedIn && (
          <label className="block">
            <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
            />
          </label>
        )}
        <label className="block">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">
            Phone (for pickup coordination)
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          />
        </label>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="space-y-3">
        <button
          onClick={() => handleSubmit("stripe")}
          disabled={isSubmitting}
          className="w-full bg-orange hover:bg-orange-dark transition-colors disabled:opacity-60 text-black font-bold text-sm py-3 rounded-full"
        >
          {isSubmitting ? "Redirecting…" : "Pay online now"}
        </button>
        <button
          onClick={() => handleSubmit("pickup")}
          disabled={isSubmitting}
          className="w-full border-2 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-60 text-black font-bold text-sm py-3 rounded-full"
        >
          {isSubmitting ? "Placing order…" : "Reserve & pay at pickup"}
        </button>
      </div>
    </div>
  );
}
