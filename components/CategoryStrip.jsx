import { categories } from "@/lib/data";

export function CategoryStrip() {
  const liveCategories = categories.filter((c) => c.status === "live");

  return (
    <section className="bg-grey-bg">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {liveCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl p-4 flex flex-col justify-between min-h-[120px] border border-grey-line"
            >
              <div>
                <div className="font-semibold text-sm mb-1">{category.name}</div>
                <div className="text-2xl font-display font-extrabold text-orange">
                  $7.00<span className="text-sm font-semibold text-black">/dozen</span>
                </div>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wide mt-2 text-turquoise-dark">In stock</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
