import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { getEvents, monthShort, dayNum, yearNum } from '../data/events'
import { DateBlock, PageHero, Section, StatusTag } from '../components/ui'
import { useLang } from '../i18n/LanguageContext'

function EventRow({ e }) {
  const { pick } = useLang()
  return (
    <Link to={`/campaigns/${e.slug}`} className="row">
      <DateBlock event={e} monthShort={monthShort} dayNum={dayNum} yearNum={yearNum} />
      <div>
        <div className="row-title">{e.title}</div>
        <div className="row-sub">
          {pick(e.subtitle)} · {pick(e.location)}
        </div>
      </div>
      <div className="row-end">
        <StatusTag status={e.status} />
      </div>
    </Link>
  )
}

export default function Events() {
  const { t } = useLang()
  usePageTitle(t('events.eyebrow'))
  const today = new Date()
  const all = getEvents()
  const upcoming = all.filter((e) => e.tba || (e.end ?? e.start) >= today)
  const past = all.filter((e) => !upcoming.includes(e)).reverse()

  return (
    <>
      <PageHero eyebrow={t('events.eyebrow')} title={t('events.title')} lede={t('events.lede')} />
      <Section>
        <div className="section-head">
          <span className="eyebrow">{t('events.upcomingEyebrow')}</span>
          <h2>{t('events.upcomingTitle')}</h2>
        </div>
        <div className="rows">
          {upcoming.map((e) => (
            <EventRow e={e} key={e.slug} />
          ))}
        </div>
        <p className="small muted mt-3">
          {t('events.note')}{' '}
          <Link to="/campaigns/sedekah-jumaat" className="text-link">
            {t('events.giveWeekly')}
          </Link>
          .
        </p>
      </Section>
      <Section className="section-paper">
        <div className="section-head">
          <span className="eyebrow">{t('events.pastEyebrow')}</span>
          <h2>{t('events.pastTitle')}</h2>
        </div>
        <div className="rows">
          {past.map((e) => (
            <EventRow e={e} key={e.slug} />
          ))}
        </div>
      </Section>
    </>
  )
}
