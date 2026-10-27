import { campaigns } from './programs'

// Events are derived from dated campaigns so there is one source of truth.
export const getEvents = () => {
  const dated = campaigns.filter((c) => c.start)
  const toDate = (s) => new Date(`${s}T00:00:00`)
  return dated
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      subtitle: c.subtitle,
      dateLabel: c.dateLabel,
      start: toDate(c.start),
      end: c.end ? toDate(c.end) : null,
      tba: !!c.tba,
      location: c.location,
      status: c.status,
      kind: c.kind,
    }))
    .sort((a, b) => a.start - b.start)
}

const LOCALE = { en: 'en-GB', ms: 'ms-MY' }

export const monthShort = (d, lang = 'en') => d.toLocaleString(LOCALE[lang] ?? 'en-GB', { month: 'short' })
export const dayNum = (d) => d.getDate()
export const yearNum = (d) => d.getFullYear()
