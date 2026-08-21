import { prisma } from "@/lib/prisma";
import { AddToCartButton } from "./AddToCartButton";

export async function FeaturedProduct() {
  const liveCategories = await prisma.category.findMany({
    where: { status: "live" },
    include: { variants: { orderBy: { price: "asc" } } },
    orderBy: { createdAt: "asc" },
  });

  if (liveCategories.length === 0) {
    return null;
  }

  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto px-4 py-12 md:py-14 space-y-12">
        {liveCategories.map((category) => {
          const variants =
            category.variants.length > 0
              ? category.variants
              : category.price != null
                ? [{ id: category.id, label: "Standard", price: category.price, stockCount: category.stockCount }]
                : [];

          return (
            <div key={category.id} className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
              <div className="bg-grey-bg rounded-2xl flex items-center justify-center h-64 md:h-80">
                <div className="text-7xl">🥚</div>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-turquoise-dark uppercase tracking-wide mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-turquoise" />
                  In stock — local pickup
                </span>

                <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-3">{category.name}</h2>

                <p className="text-black/60 text-lg max-w-[52ch] mb-8">{category.description}</p>

                {variants.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 max-w-lg mb-4">
                    {variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="border border-grey-line rounded-xl p-5 hover:border-black transition-colors"
                      >
                        <div className="text-sm font-semibold mb-1">{variant.label}</div>
                        <div className="text-3xl font-display font-extrabold text-orange mb-4">
                          ${Number(variant.price).toFixed(2)}
                        </div>
                        <AddToCartButton
                          categoryName={category.name}
                          variantLabel={variant.label}
                          price={Number(variant.price)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-black/50 mb-4">Pricing coming soon.</p>
                )}

                <p className="text-sm text-black/50">Local pickup only — no shipping at this time.</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
