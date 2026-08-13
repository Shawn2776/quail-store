import { categories } from "@/lib/data";

export function CategoryStrip() {
  return (
    <section className="bg-grey-bg">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((category) => {
            const isLive = category.status === "live";
            return (
              <div
                key={category.id}
                className="bg-white rounded-xl p-4 flex flex-col justify-between min-h-[120px] border border-grey-line"
              >
                <div>
                  <div className="font-semibold text-sm mb-1">{category.name}</div>
                  {isLive ? (
                    <div className="text-2xl font-display font-extrabold text-orange">
                      $7.00<span className="text-sm font-semibold text-black">/dozen</span>
                    </div>
                  ) : (
                    <div className="text-sm text-black/50">Pricing TBD</div>
                  )}
                </div>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wide mt-2 ${isLive ? "text-turquoise-dark" : "text-black/40"}`}
                >
                  {isLive ? "In stock" : "Coming soon"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
