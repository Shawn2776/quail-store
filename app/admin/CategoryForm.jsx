"use client";

import { useActionState } from "react";
import { updateCategory } from "@/app/admin/categories/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

const initialState = { success: null, message: "" };

export function CategoryForm({ category }) {
  const [state, formAction] = useActionState(updateCategory, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={category.id} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-extrabold text-lg">{category.name}</h2>
        <select
          name="status"
          defaultValue={category.status}
          className="border border-grey-line rounded-lg px-3 py-1.5 text-sm font-semibold"
        >
          <option value="live">Live</option>
          <option value="soon">Coming soon</option>
        </select>
      </div>

      <p className="text-sm text-black/60 mb-4">{category.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <label className="block">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Fallback price ($)</span>
          <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={category.price ?? ""}
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Fallback stock</span>
          <input
            type="number"
            name="stockCount"
            defaultValue={category.stockCount ?? ""}
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          />
        </label>
      </div>

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
