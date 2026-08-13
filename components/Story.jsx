export function Story() {
  return (
    <section id="story" className="bg-white border-t border-grey-line">
      <div className="max-w-[1400px] mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <span className="text-orange font-bold text-sm uppercase tracking-wide">Our story</span>
          <h2 className="text-3xl md:text-4xl mt-2 mb-4 max-w-[16ch]">Raised in the backyard, not a barn.</h2>
          <p className="text-black/60 max-w-[56ch] mb-3 text-lg">
            2776 Quail Co. started as a handful of Coturnix hens on a small plot. We still keep it that way — a
            manageable flock, checked on daily, with eggs collected and sold within the same day whenever we can.
          </p>
          <p className="text-black/60 max-w-[56ch] text-lg">
            Everything here is local pickup for now. As the flock grows, hatching eggs, live birds, and processed meat
            will come online — you&apos;ll see it update live right on this page.
          </p>
        </div>

        <div className="flex md:flex-col gap-4 shrink-0">
          <div className="bg-grey-bg rounded-xl px-6 py-4 text-center min-w-[110px]">
            <div className="text-3xl font-display font-extrabold text-orange">1</div>
            <div className="text-xs font-bold uppercase tracking-wide text-black/50 mt-1">Product live</div>
          </div>
          <div className="bg-grey-bg rounded-xl px-6 py-4 text-center min-w-[110px]">
            <div className="text-3xl font-display font-extrabold text-turquoise-dark">3</div>
            <div className="text-xs font-bold uppercase tracking-wide text-black/50 mt-1">Coming soon</div>
          </div>
        </div>
      </div>
    </section>
  );
}
