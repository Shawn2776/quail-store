"use client";

import { useActionState } from "react";
import { updateVariant } from "@/app/admin/categories/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

const initialState = { success: null, message: "" };

export function VariantForm({ variant }) {
  const [state, formAction] = useActionState(updateVariant, initialState);

  return (
    <div>
      <form action={formAction} className="flex items-center gap-2 bg-grey-bg rounded-lg p-3">
        <input type="hidden" name="id" value={variant.id} />
        <input
          type="text"
          name="label"
          defaultValue={variant.label}
          className="flex-1 border border-grey-line rounded-lg px-2 py-1.5 text-sm"
        />
        <input
          type="number"
          step="0.01"
          name="price"
          defaultValue={variant.price}
          className="w-24 border border-grey-line rounded-lg px-2 py-1.5 text-sm"
        />
        <input
          type="number"
          name="stockCount"
          defaultValue={variant.stockCount ?? ""}
          placeholder="Stock"
          className="w-20 border border-grey-line rounded-lg px-2 py-1.5 text-sm"
        />
        <SubmitButton
          pendingText="…"
          className="text-xs font-bold text-turquoise-dark hover:underline shrink-0 disabled:opacity-60"
        >
          Save
        </SubmitButton>
      </form>
      {state.message && (
        <p className={`text-xs mt-1 ${state.success ? "text-turquoise-dark" : "text-red-600"}`}>{state.message}</p>
      )}
    </div>
  );
}
