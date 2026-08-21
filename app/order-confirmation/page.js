import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({ searchParams }) {
  const { order: orderId } = await searchParams;

  const order = orderId
    ? await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      })
    : null;

  if (!order) {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-display font-extrabold mb-3">Order not found</h1>
        <p className="text-black/60 mb-6">
          We couldn&apos;t find that order — if you just checked out, try checking your email for a confirmation, or
          contact us directly.
        </p>
        <a
          href="/"
          className="inline-block bg-black hover:bg-orange transition-colors text-white font-bold text-sm py-3 px-6 rounded-full"
        >
          Back to shop
        </a>
      </div>
    );
  }

  const isPickup = order.paymentMethod === "pickup";

  return (
    <div className="max-w-[600px] mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-turquoise-dark uppercase tracking-wide mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-turquoise" />
          Order confirmed
        </span>
        <h1 className="text-3xl font-display font-extrabold mb-2">{isPickup ? "You're all set." : "Thank you!"}</h1>
        <p className="text-black/60">
          {isPickup
            ? "Your order is reserved — pay when you pick it up."
            : "Your payment went through and your order is confirmed."}
        </p>
      </div>

      <div className="bg-white border border-grey-line rounded-xl p-5 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-black/50 mb-3">Order summary</h2>
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm mb-2">
            <span>
              {item.label} × {item.quantity}
            </span>
            <span className="font-semibold">${(Number(item.price) * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-display font-extrabold text-lg pt-3 mt-3 border-t border-grey-line">
          <span>Total</span>
          <span>${Number(order.total).toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-grey-bg rounded-xl p-5 mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-black/50 mb-2">Pickup</h2>
        <p className="text-sm text-black/70">
          We&apos;ll text or email you a pickup window — usually same or next day. Questions in the meantime? Reach out
          through the contact info on our site.
        </p>
      </div>

      <div className="text-center">
        <a href="/" className="text-sm font-semibold text-orange hover:underline">
          ← Back to shop
        </a>
      </div>
    </div>
  );
}
