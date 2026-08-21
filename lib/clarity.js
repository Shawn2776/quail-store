async function fetchClarityInsights() {
  const token = process.env.CLARITY_API_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=1", {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 86400 }, // cache for 24 hours — stays well under Clarity's 10 requests/day cap
    });

    if (!res.ok) {
      console.error("Clarity API error:", res.status, await res.text());
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Clarity API request failed:", err);
    return null;
  }
}

export async function getClarityDailySummary() {
  const data = await fetchClarityInsights();
  if (!data) return null;

  // The exact response shape isn't fully confirmed on our end yet — this
  // looks for a "Traffic" metric block, which is Clarity's typical format,
  // but if this comes back null despite a valid token, check the Vercel
  // deploy logs for the raw `data` this endpoint actually returned.
  const trafficMetric = Array.isArray(data) ? data.find((m) => m.metricName === "Traffic") : null;

  const info = trafficMetric?.information?.[0];

  if (!info) {
    console.error("Clarity: couldn't find expected Traffic metric in response:", JSON.stringify(data));
    return null;
  }

  return {
    sessions: info.totalSessionCount ?? null,
    users: info.distinctUserCount ?? null,
  };
}
