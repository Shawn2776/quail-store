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
  revalidatePath("/");
}

export async function addVariant(formData) {
  const categoryId = formData.get("categoryId");
  const label = formData.get("label");
  const price = formData.get("price");
  const stockRaw = formData.get("stockCount");

  await prisma.productVariant.create({
    data: {
      categoryId,
      label,
      price: Number(price),
      stockCount: stockRaw ? Number(stockRaw) : null,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function updateVariant(formData) {
  const id = formData.get("id");
  const label = formData.get("label");
  const price = formData.get("price");
  const stockRaw = formData.get("stockCount");

  await prisma.productVariant.update({
    where: { id },
    data: {
      label,
      price: Number(price),
      stockCount: stockRaw ? Number(stockRaw) : null,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}

export async function deleteVariant(formData) {
  const id = formData.get("id");

  await prisma.productVariant.delete({ where: { id } });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}
