"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateHatchCam(prevState, formData) {
  const mode = formData.get("mode");
  const photoUrl = formData.get("photoUrl");
  const liveEmbedUrl = formData.get("liveEmbedUrl");

  try {
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
    revalidatePath("/");

    return { success: true, message: "Saved." };
  } catch (err) {
    console.error("updateHatchCam failed:", err);
    return { success: false, message: "Something went wrong. Try again." };
  }
}
