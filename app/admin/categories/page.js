import { prisma } from "@/lib/prisma";
import { updateCategory } from "./actions";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold mb-1">Categories</h1>
      <p className="text-black/60 mb-8">Flip a category live once it&apos;s actually ready to sell.</p>

      <div className="space-y-4 max-w-2xl">
        {categories.map((category) => (
          <form key={category.id} action={updateCategory} className="bg-white border border-grey-line rounded-xl p-5">
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
                <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Price ($)</span>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  defaultValue={category.price ?? ""}
                  className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Stock count</span>
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
        ))}
      </div>
    </div>
  );
}
