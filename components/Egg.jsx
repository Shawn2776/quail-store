import { Speckle } from "./Speckle";

/**
 * A single speckled egg shape. Sizing/position/rotation is controlled
 * entirely via `className` from the parent, since it's reused at very
 * different scales (hero graphic, product cartons, category icons).
 */
export function Egg({ className = "" }) {
  return (
    <div className={`egg-shape relative overflow-hidden ${className}`}>
      <Speckle />
    </div>
  );
}
