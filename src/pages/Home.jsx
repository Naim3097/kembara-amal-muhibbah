import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { useDonation } from '../context/DonationContext'
import { useLang } from '../i18n/LanguageContext'
import { org } from '../data/organisation'
import { pillars, activeCampaigns } from '../data/programs'
import { getEvents, monthShort, dayNum, yearNum } from '../data/events'
import { CampaignCard, DateBlock, Section, StatusTag } from '../components/ui'

const photos = [
  { src: '/images/kenduri-crowd.jpg', key: 'photos.crowd' },
  { src: '/images/azan-competition.jpg', key: 'photos.azan' },
  { src: '/images/volunteers-loading.jpg', key: 'photos.loading' },
  { src: '/images/kenduri-serving-02.jpg', key: 'photos.serving2' },
  { src: '/images/kelas-fardhu-ain.jpg', key: 'photos.fardhuAin' },
]

export default function Home() {
  usePageTitle(null)
  const { openDonation } = useDonation()
  const { t, pick } = useLang()
  const open = activeCampaigns().slice(0, 3)
  const today = new Date()
  const upcoming = getEvents().filter((e) => e.tba || (e.end ?? e.start) >= today).slice(0, 4)

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">{org.legalName}</span>
            <h1>{t('home.title')}</h1>
            <p className="lede">{t('home.lede')}</p>
            <div className="hero-actions">
              <button type="button" className="btn btn-brand btn-lg" onClick={() => openDonation()}>
                {t('common.donate')}
              </button>
              <Link to="/programs" className="btn btn-ghost btn-lg">
                {t('home.ourProgrammes')}
              </Link>
            </div>
            <div className="hero-note">
              <span>{t('home.note1')}</span>
              <span>{t('home.note2')}</span>
            </div>
          </div>
          <figure className="hero-media figure">
            <img src="/images/volunteers-group.jpg" alt={t('home.heroAlt')} />
            <figcaption className="hero-caption">{t('home.heroCaption')}</figcaption>
          </figure>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          {org.stats.map((s) => (
            <div className="stat" key={s.value}>
              <div className="stat-value num">{s.value}</div>
              <div className="stat-label">{pick(s.label)}</div>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <div className="section-head">
          <span className="eyebrow">{t('home.areasEyebrow')}</span>
          <h2>{t('home.areasTitle')}</h2>
          <p className="lede">{t('home.areasLede')}</p>
        </div>
        <div className="pillars">
          {pillars.map((p, i) => (
            <Link to={`/programs#${p.slug}`} className="pillar" key={p.slug}>
              <span className="pillar-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <span className="pillar-ms">{pick(p.subtitle)}</span>
              <p>{pick(p.summary)}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="section-paper">
        <div className="section-head-row">
          <div className="section-head">
            <span className="eyebrow">{t('home.appealsEyebrow')}</span>
            <h2>{t('home.appealsTitle')}</h2>
          </div>
          <Link to="/programs" className="text-link">
            {t('common.allProgrammes')}
          </Link>
        </div>
        <div className="grid grid-3">
          {open.map((c) => (
            <CampaignCard campaign={c} key={c.slug} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="section-head-row">
          <div className="section-head">
            <span className="eyebrow">{t('home.calendarEyebrow')}</span>
            <h2>{t('home.calendarTitle')}</h2>
          </div>
          <Link to="/events" className="text-link">
            {t('common.fullCalendar')}
          </Link>
        </div>
        <div className="rows">
          {upcoming.map((e) => (
            <Link to={`/campaigns/${e.slug}`} className="row" key={e.slug}>
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
          ))}
        </div>
      </Section>

      <Section className="section-paper">
        <div className="section-head-row">
          <div className="section-head">
            <span className="eyebrow">{t('home.fieldEyebrow')}</span>
            <h2>{t('home.fieldTitle')}</h2>
          </div>
          <Link to="/gallery" className="text-link">
            {t('common.gallery')}
          </Link>
        </div>
        <div className="photo-band">
          {photos.map((p) => (
            <figure key={p.src}>
              <img src={p.src} alt={t(p.key)} loading="lazy" />
              <figcaption>{t(p.key)}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section className="section-ink">
        <div className="split">
          <div>
            <span className="eyebrow">{t('home.sedekahEyebrow')}</span>
            <h2 className="mt-2">{t('home.sedekahTitle')}</h2>
            <p className="lede mt-3">{t('home.sedekahLede')}</p>
            <div className="actions mt-4">
              {[5, 10, 50].map((amt) => (
                <button key={amt} type="button" className="btn btn-outline-paper" onClick={() => openDonation({ campaign: 'sedekah-jumaat' })}>
                  RM{amt}
                </button>
              ))}
              <button type="button" className="btn btn-brand" onClick={() => openDonation({ campaign: 'sedekah-jumaat' })}>
                {t('home.giveWeekly')}
              </button>
            </div>
          </div>
          <blockquote className="quote" style={{ color: 'var(--paper)', margin: 0 }}>
            {t('home.quote')}
            <span className="quote-source" style={{ color: 'var(--ink-4)' }}>
              {t('home.quoteSource')}
            </span>
          </blockquote>
        </div>
      </Section>

      <Section>
        <div className="grid grid-2" style={{ '--gap': '2rem' }}>
          <div className="panel panel-brand">
            <span className="eyebrow" style={{ color: 'var(--ink-2)' }}>
              {t('home.volunteerEyebrow')}
            </span>
            <h2 className="mt-2" style={{ fontSize: 'clamp(1.7rem, 2.6vw, 2.2rem)' }}>
              {t('home.volunteerTitle')}
            </h2>
            <p className="mt-2" style={{ color: 'var(--ink-2)', maxWidth: '44ch' }}>
              {t('home.volunteerText')}
            </p>
            <Link to="/volunteer" className="btn btn-ink mt-4">
              {t('home.volunteerCta')}
            </Link>
          </div>
          <div className="panel">
            <span className="eyebrow">{t('home.bankEyebrow')}</span>
            <h3 className="mt-2">{t('home.bankTitle')}</h3>
            <div className="bank-card mt-3">
              <span className="small muted">{org.bank.name}</span>
              <span className="acct num">{org.bank.accountNoSpaced}</span>
              <span>{org.bank.accountName}</span>
            </div>
            <p className="small muted mt-3">{t('home.bankText')}</p>
            <Link to="/donate#transfer" className="text-link small mt-3" style={{ display: 'inline-block' }}>
              {t('home.bankLink')}
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
