"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateHatchCam(formData) {
  const mode = formData.get("mode");
  const photoUrl = formData.get("photoUrl");
  const liveEmbedUrl = formData.get("liveEmbedUrl");

  await prisma.hatchCamSettings.upsert({
    where: { id: "singleton" },
    update: {
      mode,
      photoUrl: photoUrl || null,
      liveEmbedUrl: liveEmbedUrl || null,
    },
    create: {
      id: "singleton",
      mode,
      photoUrl: photoUrl || null,
      liveEmbedUrl: liveEmbedUrl || null,
    },
  });

  revalidatePath("/admin/hatchcam");
  revalidatePath("/"); // storefront reads this too, once step 10 is done
}
