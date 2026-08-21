import { prisma } from "@/lib/prisma";
import { updateCategory, addVariant, updateVariant, deleteVariant } from "./actions";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "asc" },
    include: { variants: { orderBy: { createdAt: "asc" } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold mb-1">Categories</h1>
      <p className="text-black/60 mb-8">
        Flip a category live once it&apos;s actually ready to sell, and manage its variants (sizes/quantities and their
        prices) below.
      </p>

      <div className="space-y-6 max-w-2xl">
        {categories.map((category) => (
          <div key={category.id} className="bg-white border border-grey-line rounded-xl p-5">
            <form action={updateCategory}>
              <input type="hidden" name="id" value={category.id} />

              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-extrabold text-lg">{category.name}</h2>
                <select
                  name="status"
                  defaultValue={category.status}
                  className="border border-grey-line rounded-lg px-3 py-1.5 text-sm font-semibold"
                >
                  <option value="live">Live</option>
                  <option value="soon">Coming soon</option>
                </select>
              </div>

              <p className="text-sm text-black/60 mb-4">{category.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="block">
                  <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">
                    Fallback price ($)
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    defaultValue={category.price ?? ""}
                    className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Fallback stock</span>
                  <input
                    type="number"
                    name="stockCount"
                    defaultValue={category.stockCount ?? ""}
                    className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="bg-black hover:bg-orange transition-colors text-white font-bold text-sm py-2 px-5 rounded-full"
              >
                Save
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-grey-line">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-black/50 mb-3">Variants</h3>

              {category.variants.length === 0 && (
                <p className="text-sm text-black/50 mb-4">No variants yet — uses the fallback price/stock above.</p>
              )}

              <div className="space-y-3 mb-4">
                {category.variants.map((variant) => (
                  <form
                    key={variant.id}
                    action={updateVariant}
                    className="flex items-center gap-2 bg-grey-bg rounded-lg p-3"
                  >
                    <input type="hidden" name="id" value={variant.id} />
                    <input
                      type="text"
                      name="label"
                      defaultValue={variant.label}
                      className="flex-1 border border-grey-line rounded-lg px-2 py-1.5 text-sm"
                    />
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      defaultValue={variant.price}
                      className="w-24 border border-grey-line rounded-lg px-2 py-1.5 text-sm"
                    />
                    <input
                      type="number"
                      name="stockCount"
                      defaultValue={variant.stockCount ?? ""}
                      placeholder="Stock"
                      className="w-20 border border-grey-line rounded-lg px-2 py-1.5 text-sm"
                    />
                    <button type="submit" className="text-xs font-bold text-turquoise-dark hover:underline shrink-0">
                      Save
                    </button>
                  </form>
                ))}
              </div>

              {category.variants.map((variant) => (
                <form key={`del-${variant.id}`} action={deleteVariant} className="inline-block mr-2">
                  <input type="hidden" name="id" value={variant.id} />
                  <button type="submit" className="text-xs text-black/40 hover:text-red-600 mb-3">
                    Delete &quot;{variant.label}&quot;
                  </button>
                </form>
              ))}

              <form action={addVariant} className="flex items-center gap-2 pt-3 border-t border-grey-line">
                <input type="hidden" name="categoryId" value={category.id} />
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
                <button type="submit" className="text-xs font-bold text-turquoise-dark hover:underline shrink-0">
                  + Add
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
