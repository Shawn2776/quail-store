"use client";

import { useActionState } from "react";
import { updateHatchCam } from "@/app/admin/hatchcam/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

const initialState = { success: null, message: "" };

export function HatchCamForm({ settings }) {
  const [state, formAction] = useActionState(updateHatchCam, initialState);

  return (
    <form action={formAction} className="bg-white border border-grey-line rounded-xl p-5 max-w-lg">
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

      <div className="flex items-center gap-3">
        <SubmitButton className="bg-black hover:bg-orange transition-colors disabled:opacity-60 text-white font-bold text-sm py-2 px-5 rounded-full">
          Save
        </SubmitButton>
        {state.message && (
          <span className={`text-sm font-semibold ${state.success ? "text-turquoise-dark" : "text-red-600"}`}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
