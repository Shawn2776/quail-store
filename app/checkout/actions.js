"use server";

import Stripe from "stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(cartItems, customerInfo) {
  const { userId: clerkId } = await auth();
  let dbUserId = null;

  if (clerkId) {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    dbUserId = user?.id ?? null;
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Create the order up front in "pending" status — Stripe's webhook will
  // flip it to "paid" once payment actually completes. This way we have a
  // record even if someone abandons the Stripe page before finishing.
  const order = await prisma.order.create({
    data: {
      userId: dbUserId,
      guestName: dbUserId ? null : customerInfo.name,
      guestEmail: customerInfo.email,
      guestPhone: customerInfo.phone,
      paymentMethod: "stripe",
      status: "pending",
      total,
      items: {
        create: cartItems.map((item) => ({
          categoryId: item.categoryId,
          variantId: item.id,
          label: `${item.categoryName} — ${item.label}`,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: customerInfo.email,
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: `${item.categoryName} — ${item.label}` },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation?order=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
    metadata: { orderId: order.id },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  });

  return { url: session.url };
}

export async function createPickupOrder(cartItems, customerInfo) {
  const { userId: clerkId } = await auth();
  let dbUserId = null;

  if (clerkId) {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    dbUserId = user?.id ?? null;
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId: dbUserId,
      guestName: dbUserId ? null : customerInfo.name,
      guestEmail: customerInfo.email,
      guestPhone: customerInfo.phone,
      paymentMethod: "pickup",
      status: "pending",
      total,
      items: {
        create: cartItems.map((item) => ({
          categoryId: item.categoryId,
          variantId: item.id,
          label: `${item.categoryName} — ${item.label}`,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
  });

  return { orderId: order.id };
}
