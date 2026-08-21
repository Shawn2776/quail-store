import { prisma } from "@/lib/prisma";
import { getVisitorCount, getEventCounts } from "@/lib/vercelAnalytics";
import { getClarityDailySummary } from "@/lib/clarity";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [liveCategoryCount, qaEntryCount, userCount, visitorCount, eventCounts, claritySummary] = await Promise.all([
    prisma.category.count({ where: { status: "live" } }),
    prisma.qaEntry.count(),
    prisma.user.count(),
    getVisitorCount(),
    getEventCounts(),
    getClarityDailySummary(),
  ]);

  const stats = [
    { label: "Live products", value: liveCategoryCount },
    { label: "QA entries logged", value: qaEntryCount },
    { label: "Signed-up users", value: userCount },
    { label: "Visitors (7 days)", value: visitorCount ?? "—" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold mb-1">Overview</h1>
      <p className="text-black/60 mb-8">Welcome to the 2776 Quail Co. admin dashboard.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-grey-line rounded-xl p-5">
            <div className="text-3xl font-display font-extrabold text-orange">{stat.value}</div>
            <div className="text-xs font-semibold text-black/50 uppercase tracking-wide mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-grey-line rounded-xl p-5">
          <h2 className="font-display font-extrabold text-lg mb-3">Events (last 7 days)</h2>
          {eventCounts.length === 0 && (
            <p className="text-sm text-black/50">
              No event data yet, or the Vercel Analytics API isn&apos;t configured.
            </p>
          )}
          <div className="space-y-2">
            {eventCounts.map((event) => (
              <div key={event.name} className="flex justify-between text-sm">
                <span className="text-black/70">{event.name}</span>
                <span className="font-semibold">{event.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-grey-line rounded-xl p-5">
          <h2 className="font-display font-extrabold text-lg mb-3">Session recordings</h2>
          <p className="text-sm text-black/60 mb-4">
            Watch how real visitors move through the site, via Microsoft Clarity.
          </p>

          {claritySummary && (
            <div className="flex gap-6 mb-4 text-sm">
              <div>
                <div className="text-xl font-display font-extrabold text-orange">{claritySummary.sessions ?? "—"}</div>
                <div className="text-xs text-black/50">Sessions today</div>
              </div>
              <div>
                <div className="text-xl font-display font-extrabold text-orange">{claritySummary.users ?? "—"}</div>
                <div className="text-xs text-black/50">Visitors today</div>
              </div>
            </div>
          )}

          <a
            href="https://clarity.microsoft.com/projects/view/y5k3faxelb/gettingstarted"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black hover:bg-orange transition-colors text-white font-bold text-sm py-2 px-5 rounded-full"
          >
            Open Clarity dashboard →
          </a>
        </div>
      </div>
    </div>
  );
}
