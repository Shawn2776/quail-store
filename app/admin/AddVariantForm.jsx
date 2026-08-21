"use client";

import { useActionState, useRef, useEffect } from "react";
import { addVariant } from "@/app/admin/categories/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

const initialState = { success: null, message: "" };

export function AddVariantForm({ categoryId }) {
  const [state, formAction] = useActionState(addVariant, initialState);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="pt-3 border-t border-grey-line">
      <form ref={formRef} action={formAction} className="flex items-center gap-2">
        <input type="hidden" name="categoryId" value={categoryId} />
        <input
          type="text"
          name="label"
          placeholder="e.g. Half dozen"
          required
          className="flex-1 border border-grey-line rounded-lg px-2 py-1.5 text-sm"
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          required
          className="w-24 border border-grey-line rounded-lg px-2 py-1.5 text-sm"
        />
        <input
          type="number"
          name="stockCount"
          placeholder="Stock"
          className="w-20 border border-grey-line rounded-lg px-2 py-1.5 text-sm"
        />
        <SubmitButton
          pendingText="Adding…"
          className="text-xs font-bold text-turquoise-dark hover:underline shrink-0 disabled:opacity-60"
        >
          + Add
        </SubmitButton>
      </form>
      {state.message && (
        <p className={`text-xs mt-1 ${state.success ? "text-turquoise-dark" : "text-red-600"}`}>{state.message}</p>
      )}
    </div>
  );
}
