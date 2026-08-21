"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addQaEntry(prevState, formData) {
  const categoryId = formData.get("categoryId");
  const note = formData.get("note");
  const eggsSetRaw = formData.get("eggsSet");
  const eggsHatchedRaw = formData.get("eggsHatched");
  const chicksDiedRaw = formData.get("chicksDied");

  try {
    await prisma.qaEntry.create({
      data: {
        categoryId,
        note,
        eggsSet: eggsSetRaw ? Number(eggsSetRaw) : null,
        eggsHatched: eggsHatchedRaw ? Number(eggsHatchedRaw) : null,
        chicksDied: chicksDiedRaw ? Number(chicksDiedRaw) : null,
      },
    });

    revalidatePath("/admin/qa");

    return { success: true, message: "Entry added." };
  } catch (err) {
    console.error("addQaEntry failed:", err);
    return { success: false, message: "Something went wrong. Try again." };
  }
}
