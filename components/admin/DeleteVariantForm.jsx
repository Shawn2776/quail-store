"use client";

import { useActionState } from "react";
import { deleteVariant } from "@/app/admin/categories/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";

const initialState = { success: null, message: "" };

export function DeleteVariantForm({ variant }) {
  const [state, formAction] = useActionState(deleteVariant, initialState);

  if (state.success) return null;

  return (
    <span className="inline-flex items-center gap-2 mr-3 mb-3">
      <form action={formAction} className="inline">
        <input type="hidden" name="id" value={variant.id} />
        <SubmitButton pendingText="Deleting…" className="text-xs text-black/40 hover:text-red-600 disabled:opacity-60">
          Delete &quot;{variant.label}&quot;
        </SubmitButton>
      </form>
      {state.message && !state.success && <span className="text-xs text-red-600">{state.message}</span>}
    </span>
  );
}
