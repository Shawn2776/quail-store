"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCategory(formData) {
  const id = formData.get("id");
  const status = formData.get("status");
  const priceRaw = formData.get("price");
  const stockRaw = formData.get("stockCount");

  await prisma.category.update({
    where: { id },
    data: {
      status,
      price: priceRaw ? Number(priceRaw) : null,
      stockCount: stockRaw ? Number(stockRaw) : null,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/"); // storefront reads this data too, once step 10 is done
}
