import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { itineraries } from '../data/programs'
import { formatRM } from '../data/organisation'
import { PageHero, Section, StatusTag } from '../components/ui'
import { useLang } from '../i18n/LanguageContext'

export default function Itineraries() {
  const { t, pick } = useLang()
  usePageTitle(t('itineraries.eyebrow'))
  const list = itineraries()
  const steps = t('itineraries.steps')
  return (
    <>
      <PageHero eyebrow={t('itineraries.eyebrow')} title={t('itineraries.title')} lede={t('itineraries.lede')} />

      <Section>
        <div className="rows">
          {list.map((c) => (
            <Link to={`/itineraries/${c.slug}`} className="row" key={c.slug}>
              <div className="row-date">
                {t('common.days', { n: c.itinerary.days.length })}
                <small>{c.itinerary.draft ? t('common.draftSchedule') : t('common.confirmed')}</small>
              </div>
              <div>
                <div className="row-title">{c.title}</div>
                <div className="row-sub">
                  {pick(c.dateLabel)} · {pick(c.location)}
                </div>
              </div>
              <div className="row-end">
                {c.itinerary.fee?.amount != null && (
                  <span className="meta num">{t('common.perVolunteer', { amount: formatRM(c.itinerary.fee.amount) })}</span>
                )}
                <StatusTag status={c.status} />
              </div>
            </Link>
          ))}
        </div>
        <p className="small muted mt-3">{t('itineraries.note')}</p>
      </Section>

      <Section className="section-paper">
        <div className="section-head">
          <span className="eyebrow">{t('itineraries.howEyebrow')}</span>
          <h2>{t('itineraries.howTitle')}</h2>
        </div>
        <div className="grid grid-3" style={{ '--gap': '2rem' }}>
          {steps.map((s, i) => (
            <div key={s.title} className="person" style={{ paddingTop: '1.2rem' }}>
              <span className="pillar-index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2">{s.title}</h3>
              <p className="mt-2" style={{ color: 'var(--ink-2)', fontSize: '.98rem' }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>
        <div className="actions mt-6">
          <Link to="/volunteer" className="btn btn-brand">
            {t('itineraries.register')}
          </Link>
          <Link to="/events" className="btn btn-ghost">
            {t('common.seeCalendar')}
          </Link>
        </div>
      </Section>
    </>
  )
}
