import { prisma } from "@/lib/prisma";
import { updateHatchCam } from "./actions";

export const dynamic = "force-dynamic";

export default async function HatchCamPage() {
  const settings = await prisma.hatchCamSettings.findUnique({
    where: { id: "singleton" },
  });

  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold mb-1">Hatch Cam</h1>
      <p className="text-black/60 mb-8">Control what shows in the hero panel on the homepage.</p>

      <form action={updateHatchCam} className="bg-white border border-grey-line rounded-xl p-5 max-w-lg">
        <label className="block mb-4">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Mode</span>
          <select
            name="mode"
            defaultValue={settings?.mode ?? "offline"}
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          >
            <option value="offline">Offline (camera not hooked up)</option>
            <option value="photo">Photo</option>
            <option value="live">Live stream</option>
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Photo URL</span>
          <input
            type="text"
            name="photoUrl"
            defaultValue={settings?.photoUrl ?? ""}
            placeholder="/quail-photo.jpg"
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          />
          <span className="text-xs text-black/40">
            Used when mode is &quot;Photo&quot;. File must already be in your public/ folder.
          </span>
        </label>

        <label className="block mb-5">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Live embed URL</span>
          <input
            type="text"
            name="liveEmbedUrl"
            defaultValue={settings?.liveEmbedUrl ?? ""}
            placeholder="https://..."
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          />
          <span className="text-xs text-black/40">Used when mode is &quot;Live stream&quot;.</span>
        </label>

        <button
          type="submit"
          className="bg-black hover:bg-orange transition-colors text-white font-bold text-sm py-2 px-5 rounded-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}
