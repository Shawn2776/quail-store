"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCategory(prevState, formData) {
  const id = formData.get("id");
  const status = formData.get("status");
  const priceRaw = formData.get("price");
  const stockRaw = formData.get("stockCount");

  try {
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

    return { success: true, message: "Saved." };
  } catch (err) {
    console.error("updateCategory failed:", err);
    return { success: false, message: "Something went wrong. Try again." };
  }
}

export async function addVariant(prevState, formData) {
  const categoryId = formData.get("categoryId");
  const label = formData.get("label");
  const price = formData.get("price");
  const stockRaw = formData.get("stockCount");

  try {
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

    return { success: true, message: `Added "${label}".` };
  } catch (err) {
    console.error("addVariant failed:", err);
    return { success: false, message: "Couldn't add variant. Try again." };
  }
}

export async function updateVariant(prevState, formData) {
  const id = formData.get("id");
  const label = formData.get("label");
  const price = formData.get("price");
  const stockRaw = formData.get("stockCount");

  try {
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

    return { success: true, message: "Saved." };
  } catch (err) {
    console.error("updateVariant failed:", err);
    return { success: false, message: "Something went wrong. Try again." };
  }
}

export async function deleteVariant(prevState, formData) {
  const id = formData.get("id");

  try {
    await prisma.productVariant.delete({ where: { id } });

    revalidatePath("/admin/categories");
    revalidatePath("/");

    return { success: true, message: "Deleted." };
  } catch (err) {
    console.error("deleteVariant failed:", err);
    return { success: false, message: "Couldn't delete. Try again." };
  }
}
