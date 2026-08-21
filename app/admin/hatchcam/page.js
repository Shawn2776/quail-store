import { prisma } from "@/lib/prisma";
import { HatchCamForm } from "@/components/admin/HatchCamForm";

export const dynamic = "force-dynamic";

export default async function HatchCamPage() {
  const settings = await prisma.hatchCamSettings.findUnique({
    where: { id: "singleton" },
  });

  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold mb-1">Hatch Cam</h1>
      <p className="text-black/60 mb-8">Control what shows in the hero panel on the homepage.</p>

      <HatchCamForm settings={settings} />
    </div>
  );
}
