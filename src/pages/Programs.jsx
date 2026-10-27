import { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { campaigns, pillars, campaignsForPillar } from '../data/programs'
import { CampaignCard, PageHero, Section, StatusTag } from '../components/ui'
import { useLang } from '../i18n/LanguageContext'

const FILTERS = ['all', 'open', 'upcoming', 'completed']

export default function Programs() {
  const { t, pick } = useLang()
  usePageTitle(t('programs.eyebrow'))
  const [filter, setFilter] = useState('all')
  const list = campaigns.filter((c) => filter === 'all' || c.status === filter)

  return (
    <>
      <PageHero eyebrow={t('programs.eyebrow')} title={t('programs.title')} lede={t('programs.lede')} />

      <Section>
        <div className="filter-bar" role="group" aria-label={t('programs.filterLabel')}>
          {FILTERS.map((key) => (
            <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>
              {t(`programs.${key}`)}
            </button>
          ))}
        </div>
        <div className="grid grid-3">
          {list.map((c) => (
            <CampaignCard campaign={c} key={c.slug} />
          ))}
        </div>
      </Section>

      <Section className="section-paper">
        <div className="section-head">
          <span className="eyebrow">{t('programs.strandsEyebrow')}</span>
          <h2>{t('programs.strandsTitle')}</h2>
          <p className="lede">{t('programs.strandsLede')}</p>
        </div>
        <div className="stack" style={{ '--stack': '0' }}>
          {pillars.map((p) => {
            const related = campaignsForPillar(p.slug)
            return (
              <div key={p.slug} id={p.slug} className="split" style={{ padding: '2.2rem 0', borderTop: '1px solid var(--line-strong)' }}>
                <div>
                  <h3>{p.title}</h3>
                  <span className="pillar-ms serif italic muted">{pick(p.subtitle)}</span>
                </div>
                <div>
                  <p className="prose">{pick(p.description)}</p>
                  {related.length > 0 && (
                    <ul className="checklist mt-3">
                      {related.map((c) => (
                        <li key={c.slug}>
                          <Link to={`/campaigns/${c.slug}`} className="text-link">
                            {c.title}
                          </Link>{' '}
                          <span className="muted small">· {pick(c.dateLabel)}</span> <StatusTag status={c.status} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Section>
    </>
  )
}
