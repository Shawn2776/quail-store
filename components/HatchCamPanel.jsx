import { prisma } from "@/lib/prisma";

const badgeText = {
  live: "HATCH CAM — LIVE",
  photo: "THE FLOCK",
  offline: "HATCH CAM",
};

export async function HatchCamPanel() {
  const settings = await prisma.hatchCamSettings.findUnique({
    where: { id: "singleton" },
  });

  const mode = settings?.mode ?? "offline";

  return (
    <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/15 aspect-[16/10] flex items-center justify-center">
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold">
        {mode === "live" && <span className="w-2 h-2 rounded-full bg-turquoise animate-pulse" />}
        {badgeText[mode]}
      </div>

      {mode === "live" && settings?.liveEmbedUrl ? (
        <iframe
          src={settings.liveEmbedUrl}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : mode === "photo" && settings?.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={settings.photoUrl} alt="Our Coturnix quail" className="w-full h-full object-cover" />
      ) : (
        <div className="text-center px-8">
          <div className="text-5xl mb-3">📷</div>
          <p className="text-white/60 text-sm max-w-[26ch] mx-auto">
            Camera isn&apos;t hooked up yet — check back soon for a live look at the coop.
          </p>
        </div>
      )}
    </div>
  );
}
