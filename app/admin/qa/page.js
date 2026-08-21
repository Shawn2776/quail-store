import { prisma } from "@/lib/prisma";
import { QaEntryForm } from "@/components/admin/QaEntryForm";

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

      <QaEntryForm categories={categories} />

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
