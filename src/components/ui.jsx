import { Link } from 'react-router-dom'
import { formatRM } from '../data/organisation'
import { useDonation } from '../context/DonationContext'
import { useLang } from '../i18n/LanguageContext'

export function StatusTag({ status }) {
  const { t } = useLang()
  return <span className={`tag tag-${status}`}>{t(`status.${status}`)}</span>
}

export function Progress({ raised, target, unit }) {
  const { t, pick } = useLang()
  if (!target) return null
  const pct = raised != null ? Math.min(100, Math.round((raised / target) * 100)) : 0
  return (
    <div>
      <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={target} aria-valuenow={raised ?? 0}>
        <span style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-meta">
        <span>
          {raised != null ? (
            <>
              <strong className="num">{formatRM(raised)}</strong> {t('progress.raised')}
            </>
          ) : unit ? (
            t('common.perUnit', { price: formatRM(unit.price), unit: pick(unit.label) })
          ) : (
            t('progress.figures')
          )}
        </span>
        <span>
          {t('progress.target')} <strong className="num">{formatRM(target)}</strong>
        </span>
      </div>
    </div>
  )
}

export function CampaignCard({ campaign, showImage = true }) {
  const { openDonation } = useDonation()
  const { t, pick } = useLang()
  const completed = campaign.status === 'completed'
  return (
    <article className="card">
      {showImage && (
        <Link to={`/campaigns/${campaign.slug}`} className="card-media" aria-hidden="true" tabIndex={-1}>
          <img src={campaign.image} alt="" loading="lazy" />
        </Link>
      )}
      <div className="card-body">
        <div className="tag-row">
          <StatusTag status={campaign.status} />
        </div>
        <h3>
          <Link to={`/campaigns/${campaign.slug}`}>{campaign.title}</Link>
        </h3>
        <div className="meta meta-row">
          <span>{pick(campaign.dateLabel)}</span>
        </div>
        <p className="small" style={{ color: 'var(--ink-2)' }}>{pick(campaign.summary)}</p>
        {campaign.target ? (
          <Progress target={campaign.target} unit={campaign.unit} raised={campaign.raised ?? null} />
        ) : campaign.unit ? (
          <p className="meta">{t('common.perUnit', { price: formatRM(campaign.unit.price), unit: pick(campaign.unit.label) })}</p>
        ) : null}
      </div>
      <div className="card-foot">
        <Link to={`/campaigns/${campaign.slug}`} className="text-link small">
          {completed ? t('common.readReport') : t('common.details')}
        </Link>
        {!completed && (
          <button type="button" className="btn btn-ink btn-sm" onClick={() => openDonation({ campaign: campaign.slug })}>
            {t('common.give')}
          </button>
        )}
      </div>
    </article>
  )
}

export function PageHero({ eyebrow, title, lede, crumbs, children, className = '' }) {
  return (
    <section className={`page-hero ${className}`}>
      <div className="container">
        {crumbs && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {crumbs.map(([to, label], i) => (
              <span key={to ?? label}>
                {i > 0 && <span aria-hidden="true" style={{ marginRight: '.5rem' }}>/</span>}
                {to ? <Link to={to}>{label}</Link> : <span>{label}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </section>
  )
}

export function Section({ children, className = '', tight = false, id }) {
  return (
    <section id={id} className={`${tight ? 'section-tight' : 'section'} ${className}`}>
      <div className="container">{children}</div>
    </section>
  )
}

/** Date block for event rows: "20–21 Dec / 2025" or "Dec 2026 / Dates TBA". */
export function DateBlock({ event, monthShort, dayNum, yearNum }) {
  const { t, lang } = useLang()
  if (event.tba) {
    return (
      <div className="row-date">
        {monthShort(event.start, lang)} {yearNum(event.start)}
        <small>{t('common.datesTba')}</small>
      </div>
    )
  }
  const range = event.end && event.end.getTime() !== event.start.getTime() ? `–${dayNum(event.end)}` : ''
  return (
    <div className="row-date">
      {dayNum(event.start)}
      {range} {monthShort(event.start, lang)}
      <small>{yearNum(event.start)}</small>
    </div>
  )
}
