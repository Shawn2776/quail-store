import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tableEggs = await prisma.category.upsert({
    where: { slug: "table-eggs" },
    update: {},
    create: {
      slug: "table-eggs",
      name: "Table Eggs",
      description: "Non-fertile eating eggs, gathered daily. Sold by the half dozen or dozen.",
      status: "live",
      price: 7.0,
      stockCount: 24,
    },
  });

  await prisma.productVariant.upsert({
    where: { id: "table-eggs-half-dozen" },
    update: {},
    create: {
      id: "table-eggs-half-dozen",
      categoryId: tableEggs.id,
      label: "Half dozen",
      price: 4.0,
      stockCount: 12,
    },
  });

  await prisma.productVariant.upsert({
    where: { id: "table-eggs-full-dozen" },
    update: {},
    create: {
      id: "table-eggs-full-dozen",
      categoryId: tableEggs.id,
      label: "Full dozen",
      price: 7.0,
      stockCount: 12,
    },
  });

  await prisma.category.upsert({
    where: { slug: "hatching-eggs" },
    update: {},
    create: {
      slug: "hatching-eggs",
      name: "Hatching Eggs",
      description: "Fertile eggs for your own incubator, from our proven breeding pairs.",
      status: "soon",
    },
  });

  await prisma.category.upsert({
    where: { slug: "live-quail" },
    update: {},
    create: {
      slug: "live-quail",
      name: "Live Quail",
      description: "Started chicks and laying-age birds, available for local pickup.",
      status: "soon",
    },
  });

  await prisma.category.upsert({
    where: { slug: "quail-meat" },
    update: {},
    create: {
      slug: "quail-meat",
      name: "Quail Meat",
      description: "Processed and dressed quail, sold fresh in small batches.",
      status: "soon",
    },
  });

  await prisma.hatchCamSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      mode: "photo",
      photoUrl: "/quail-photo.jpg",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
