const STORAGE_KEY = "bilal-skills-analytics"

interface AnalyticsData {
  views: Record<string, number>
  searches: Record<string, number>
}

function load(): AnalyticsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { views: {}, searches: {} }
}

function save(data: AnalyticsData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

export function trackView(slug: string) {
  const data = load()
  data.views[slug] = (data.views[slug] || 0) + 1
  save(data)
}

export function trackSearch(query: string) {
  if (!query.trim()) return
  const data = load()
  const key = query.toLowerCase().trim()
  data.searches[key] = (data.searches[key] || 0) + 1
  save(data)
}

export function getTopSkills(limit = 5): { slug: string; count: number }[] {
  const data = load()
  return Object.entries(data.views)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([slug, count]) => ({ slug, count }))
}

export function getTopSearches(limit = 5): { query: string; count: number }[] {
  const data = load()
  return Object.entries(data.searches)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([query, count]) => ({ query, count }))
}
