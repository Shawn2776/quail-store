"use client";

import { useActionState, useRef, useEffect } from "react";
import { addQaEntry } from "@/app/admin/qa/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

const initialState = { success: null, message: "" };

export function QaEntryForm({ categories }) {
  const [state, formAction] = useActionState(addQaEntry, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="bg-white border border-grey-line rounded-xl p-5 max-w-xl mb-10">
      <h2 className="font-display font-extrabold text-lg mb-4">Add entry</h2>

      <label className="block mb-4">
        <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Category</span>
        <select name="categoryId" required className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <label className="block">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Eggs set</span>
          <input
            type="number"
            name="eggsSet"
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Eggs hatched</span>
          <input
            type="number"
            name="eggsHatched"
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Died post-hatch</span>
          <input
            type="number"
            name="chicksDied"
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          />
        </label>
      </div>

      <label className="block mb-5">
        <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Note</span>
        <textarea
          name="note"
          required
          rows={3}
          className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
        />
      </label>

      <div className="flex items-center gap-3">
        <SubmitButton
          pendingText="Adding…"
          className="bg-black hover:bg-orange transition-colors disabled:opacity-60 text-white font-bold text-sm py-2 px-5 rounded-full"
        >
          Add entry
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
