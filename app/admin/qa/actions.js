"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addQaEntry(formData) {
  const categoryId = formData.get("categoryId");
  const note = formData.get("note");
  const hatchRateRaw = formData.get("hatchRate");
  const mortalityRaw = formData.get("mortality");

  await prisma.qaEntry.create({
    data: {
      categoryId,
      note,
      hatchRate: hatchRateRaw ? Number(hatchRateRaw) : null,
      mortality: mortalityRaw ? Number(mortalityRaw) : null,
    },
  });

  revalidatePath("/admin/qa");
}
