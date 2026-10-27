import { Link, useParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { getCampaign, getPillar, campaigns } from '../data/programs'
import { org, formatRM, whatsappLink } from '../data/organisation'
import { useDonation } from '../context/DonationContext'
import { useLang } from '../i18n/LanguageContext'
import { CampaignCard, PageHero, Progress, Section, StatusTag } from '../components/ui'
import Committee from '../components/Committee'
import NotFound from './NotFound'

export default function CampaignDetail() {
  const { slug } = useParams()
  const campaign = getCampaign(slug)
  usePageTitle(campaign?.title)
  const { openDonation } = useDonation()
  const { t, pick } = useLang()
  if (!campaign) return <NotFound />

  const pillar = getPillar(campaign.pillar)
  const completed = campaign.status === 'completed'
  const others = campaigns.filter((c) => c.slug !== campaign.slug && c.status !== 'completed').slice(0, 3)
  const treasurer = org.committee.find((p) => p.id === 'halim')
  const unitLabel = campaign.unit ? pick(campaign.unit.label) : ''

  return (
    <>
      <PageHero
        crumbs={[
          ['/programs', t('common.programmes')],
          [null, campaign.title],
        ]}
        title={campaign.title}
        lede={pick(campaign.summary)}
      >
        <div className="tag-row mt-3">
          <StatusTag status={campaign.status} />
          <span className="tag">{pillar.title}</span>
        </div>
        <div className="actions mt-4">
          {!completed && (
            <button type="button" className="btn btn-brand btn-lg" onClick={() => openDonation({ campaign: campaign.slug })}>
              {t('campaign.give')}
            </button>
          )}
          {campaign.itinerary && (
            <Link to={`/itineraries/${campaign.slug}`} className="btn btn-ghost btn-lg">
              {t('common.viewItinerary')}
            </Link>
          )}
          {!completed && !campaign.itinerary && (
            <Link to="/volunteer" className="btn btn-ghost btn-lg">
              {t('common.volunteer')}
            </Link>
          )}
        </div>
      </PageHero>

      <Section>
        <div className="split split-7-5">
          <div className="stack" style={{ '--stack': '2.5rem' }}>
            <figure className="figure">
              <img src={campaign.image} alt="" />
            </figure>

            <div className="prose">
              {campaign.description.map((p, i) => (
                <p key={i}>{pick(p)}</p>
              ))}
            </div>

            <div>
              <h3 className="mb-3">{t('campaign.moneyTitle')}</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>{t('campaign.item')}</th>
                    <th>{t('campaign.detail')}</th>
                  </tr>
                </thead>
                <tbody>
                  {campaign.breakdown.map((row, i) => (
                    <tr key={i}>
                      <td>{pick(row.item)}</td>
                      <td className="muted">{row.detail ? pick(row.detail) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
                {campaign.target && (
                  <tfoot>
                    <tr>
                      <td>{t('campaign.budget')}</td>
                      <td className="num">
                        {formatRM(campaign.target)}
                        {campaign.unit && (
                          <span className="sub">
                            {t('common.perUnit', { price: formatRM(campaign.unit.price), unit: unitLabel })}
                            {campaign.unit.max ? ` · ${campaign.unit.max.toLocaleString()} ${pick(campaign.unit.labelPlural)}` : ''}
                          </span>
                        )}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
              {campaign.targetNote && <p className="small muted mt-2">{pick(campaign.targetNote)}</p>}
            </div>

            {campaign.quote && (
              <blockquote className="quote" style={{ margin: 0 }}>
                “{pick(campaign.quote.text)}”<span className="quote-source">{pick(campaign.quote.source)}</span>
              </blockquote>
            )}

            {campaign.itinerary && (
              <div className="panel panel-paper">
                <span className="eyebrow">{t('campaign.expedition')}</span>
                <h3 className="mt-2">{pick(campaign.itinerary.title)}</h3>
                <p className="mt-2" style={{ color: 'var(--ink-2)' }}>
                  {t('campaign.expeditionText', { n: campaign.itinerary.days.length, place: pick(campaign.location).split(',')[0] })}
                </p>
                <Link to={`/itineraries/${campaign.slug}`} className="btn btn-ink mt-3">
                  {t('campaign.openItinerary')}
                </Link>
              </div>
            )}

            {campaign.poster && (
              <div>
                <span className="eyebrow">{t('campaign.poster')}</span>
                <a href={campaign.poster} target="_blank" rel="noreferrer" className="poster-thumb mt-2">
                  <img src={campaign.poster} alt={t('campaign.posterAlt', { title: campaign.title })} loading="lazy" />
                </a>
                <p className="small muted mt-2">{t('campaign.posterText')}</p>
              </div>
            )}
          </div>

          <aside className="sticky stack" style={{ '--stack': '1.2rem' }}>
            <div className="panel">
              <span className="eyebrow">{completed ? t('campaign.finalAppeal') : t('campaign.appeal')}</span>
              {campaign.target ? (
                <div className="mt-3">
                  <Progress target={campaign.target} unit={campaign.unit} raised={campaign.raised ?? null} />
                </div>
              ) : campaign.unit ? (
                <div className="mt-3">
                  <div className="stat-value num" style={{ fontSize: '2.2rem' }}>
                    {formatRM(campaign.unit.price)}
                  </div>
                  <div className="small muted">{t('campaign.per', { unit: unitLabel })}</div>
                </div>
              ) : (
                <p className="mt-3" style={{ color: 'var(--ink-2)' }}>
                  {t('campaign.anyAmount')}
                </p>
              )}
              <dl className="kv mt-4">
                <dt>{t('campaign.when')}</dt>
                <dd>{pick(campaign.dateLabel)}</dd>
                <dt>{t('campaign.where')}</dt>
                <dd>{pick(campaign.location)}</dd>
                <dt>{t('campaign.reference')}</dt>
                <dd>
                  <strong>{campaign.ref}</strong>
                </dd>
              </dl>
              {!completed && (
                <button type="button" className="btn btn-brand btn-block mt-4" onClick={() => openDonation({ campaign: campaign.slug })}>
                  {t('campaign.giveOnline')}
                </button>
              )}
            </div>

            <div className="panel panel-paper">
              <span className="eyebrow">{t('campaign.bank')}</span>
              <div className="bank-card mt-2">
                <span className="small muted">{org.bank.name}</span>
                <span className="acct num" style={{ fontSize: '1.5rem' }}>
                  {org.bank.accountNoSpaced}
                </span>
                <span className="small">{org.bank.accountName}</span>
              </div>
              <p className="small muted mt-2">{t('campaign.bankText', { ref: campaign.ref })}</p>
              {treasurer && (
                <a
                  className="text-link small"
                  href={whatsappLink(treasurer.whatsapp, t('campaign.treasurerMessage', { title: campaign.title, ref: campaign.ref }))}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('campaign.whatsappTreasurer')}
                </a>
              )}
            </div>
          </aside>
        </div>
      </Section>

      <Section className="section-paper">
        <div className="section-head">
          <span className="eyebrow">{t('campaign.contactsEyebrow')}</span>
          <h2>{t('campaign.contactsTitle')}</h2>
        </div>
        <Committee ids={campaign.contacts} message={t('campaign.contactMessage', { title: campaign.title })} />
      </Section>

      {others.length > 0 && (
        <Section>
          <div className="section-head-row">
            <div className="section-head">
              <span className="eyebrow">{t('campaign.moreEyebrow')}</span>
              <h2>{t('campaign.moreTitle')}</h2>
            </div>
            <Link to="/programs" className="text-link">
              {t('common.allProgrammes')}
            </Link>
          </div>
          <div className="grid grid-3">
            {others.map((c) => (
              <CampaignCard campaign={c} key={c.slug} />
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
