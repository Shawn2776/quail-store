const VERCEL_API_BASE = "https://api.vercel.com/v1/query/web-analytics";

function dateDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}

async function vercelAnalyticsFetch(path, extraParams) {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) {
    return null;
  }

  const params = new URLSearchParams({
    projectId,
    since: dateDaysAgo(7),
    until: dateDaysAgo(0),
    ...extraParams,
  });

  try {
    const res = await fetch(`${VERCEL_API_BASE}/${path}?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Vercel Analytics API error (${path}):`, res.status, await res.text());
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error(`Vercel Analytics API request failed (${path}):`, err);
    return null;
  }
}

export async function getVisitorCount() {
  const json = await vercelAnalyticsFetch("visits/count", {});
  if (!json) return null;
  // Response shape for count endpoints isn't fully confirmed against a real
  // token yet — checking a couple of likely paths. If this stays "—" even
  // with valid env vars, log `json` here and we'll adjust.
  return json?.data?.count ?? json?.count ?? null;
}

export async function getEventCounts() {
  const json = await vercelAnalyticsFetch("events/aggregate", { by: "eventName" });
  if (!json?.data) return [];

  return json.data.map((row) => ({
    name: row.eventName ?? row.eventData ?? row.by ?? "Unknown",
    count: row.count ?? 0,
  }));
}
