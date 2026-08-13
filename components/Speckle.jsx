export function Speckle({ variant = "default", className = "" }) {
  const base = variant === "accent" ? "speckle-accent" : "speckle";
  return <div className={`absolute inset-0 ${base} ${className}`} aria-hidden="true" />;
}
