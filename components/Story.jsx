export function Story() {
  return (
    <section id="story" className="bg-white border-t border-grey-line">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <span className="text-orange font-bold text-sm uppercase tracking-wide">Our story</span>
        <h2 className="text-3xl md:text-4xl mt-2 mb-4 max-w-[16ch]">Raised in the backyard, not a barn.</h2>
        <p className="text-black/60 max-w-[56ch] mb-3 text-lg">
          2776 Quail Co. started as a handful of Coturnix hens on a small plot. We still keep it that way — a manageable
          flock, checked on daily, with eggs collected and sold within the same day whenever we can.
        </p>
        <p className="text-black/60 max-w-[56ch] text-lg">Everything here is local pickup for now.</p>
      </div>
    </section>
  );
}
