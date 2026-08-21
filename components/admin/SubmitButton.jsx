"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children, pendingText = "Saving…", className }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingText : children}
    </button>
  );
}
