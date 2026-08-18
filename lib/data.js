// Fake data for now. This will later come from Prisma/Neon, with
// `status` toggled from the admin dashboard instead of hardcoded here.

export const categories = [
  {
    id: "table-eggs",
    name: "Table Eggs",
    status: "live",
    description: "Non-fertile eating eggs, gathered daily. Sold by the half dozen or dozen.",
  },
  {
    id: "hatching-eggs",
    name: "Hatching Eggs",
    status: "soon",
    description: "Fertile eggs for your own incubator, from our proven breeding pairs.",
  },
  {
    id: "live-quail",
    name: "Live Quail",
    status: "soon",
    description: "Started chicks and laying-age birds, available for local pickup.",
  },
  {
    id: "quail-meat",
    name: "Quail Meat",
    status: "soon",
    description: "Processed and dressed quail, sold fresh in small batches.",
  },
];

export const featuredProduct = {
  name: "Coturnix table eggs",
  description:
    "Small, rich, and ready to cook — three quail eggs about equal one chicken egg. Great soft-boiled, pickled, or fried for breakfast.",
  variants: [
    { label: "Half dozen", price: 4.0 },
    { label: "Full dozen", price: 7.0 },
  ],
};

export const pickupSteps = [
  {
    title: "Place your order",
    description: "Choose your eggs and quantity online, and pay ahead of time.",
  },
  {
    title: "We confirm a time",
    description: "You'll get a message with a pickup window, usually same or next day.",
  },
  {
    title: "Swing by the coop",
    description: "Pull up, grab your order, done. Address is sent after checkout.",
  },
];

export const hatchCam = {
  mode: "photo",
  photoUrl: "/quail-photo.png",
  liveEmbedUrl: null,
};
