import { prisma } from "@/lib/prisma";
import { addQaEntry } from "./actions";

export const dynamic = "force-dynamic";

function calcRates(entry) {
  const hatchRate =
    entry.eggsSet && entry.eggsHatched != null ? ((entry.eggsHatched / entry.eggsSet) * 100).toFixed(1) : null;

  const survivalRate =
    entry.eggsHatched && entry.chicksDied != null
      ? (((entry.eggsHatched - entry.chicksDied) / entry.eggsHatched) * 100).toFixed(1)
      : null;

  return { hatchRate, survivalRate };
}

export default async function QaLogPage() {
  const [categories, entries] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.qaEntry.findMany({
      orderBy: { date: "desc" },
      include: { category: true },
      take: 20,
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold mb-1">QA Log</h1>
      <p className="text-black/60 mb-8">Log raw counts — hatch rate and survival rate are calculated for you.</p>

      <form action={addQaEntry} className="bg-white border border-grey-line rounded-xl p-5 max-w-xl mb-10">
        <h2 className="font-display font-extrabold text-lg mb-4">Add entry</h2>

        <label className="block mb-4">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Category</span>
          <select
            name="categoryId"
            required
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <label className="block">
            <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Eggs set</span>
            <input
              type="number"
              name="eggsSet"
              className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Eggs hatched</span>
            <input
              type="number"
              name="eggsHatched"
              className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Died post-hatch</span>
            <input
              type="number"
              name="chicksDied"
              className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
            />
          </label>
        </div>

        <label className="block mb-5">
          <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Note</span>
          <textarea
            name="note"
            required
            rows={3}
            className="mt-1 w-full border border-grey-line rounded-lg px-3 py-2 text-sm"
          />
        </label>

        <button
          type="submit"
          className="bg-black hover:bg-orange transition-colors text-white font-bold text-sm py-2 px-5 rounded-full"
        >
          Add entry
        </button>
      </form>

      <h2 className="font-display font-extrabold text-lg mb-4">Recent entries</h2>
      <div className="space-y-3 max-w-xl">
        {entries.length === 0 && <p className="text-sm text-black/50">No entries yet.</p>}
        {entries.map((entry) => {
          const { hatchRate, survivalRate } = calcRates(entry);
          return (
            <div key={entry.id} className="bg-white border border-grey-line rounded-xl p-4">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-sm">{entry.category.name}</span>
                <span className="text-xs text-black/40">{new Date(entry.date).toLocaleDateString()}</span>
              </div>

              {(entry.eggsSet != null || entry.eggsHatched != null || entry.chicksDied != null) && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-black/60 mb-2">
                  {entry.eggsSet != null && <span>Set: {entry.eggsSet}</span>}
                  {entry.eggsHatched != null && <span>Hatched: {entry.eggsHatched}</span>}
                  {entry.chicksDied != null && <span>Died: {entry.chicksDied}</span>}
                  {hatchRate !== null && (
                    <span className="font-semibold text-turquoise-dark">Hatch rate: {hatchRate}%</span>
                  )}
                  {survivalRate !== null && (
                    <span className="font-semibold text-turquoise-dark">Survival: {survivalRate}%</span>
                  )}
                </div>
              )}

              <p className="text-sm text-black/70">{entry.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
