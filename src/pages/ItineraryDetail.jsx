import { Link, useParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { getCampaign } from '../data/programs'
import { useDonation } from '../context/DonationContext'
import { useLang } from '../i18n/LanguageContext'
import { PageHero, Section, StatusTag } from '../components/ui'
import Itinerary from '../components/Itinerary'
import Committee from '../components/Committee'
import NotFound from './NotFound'

export default function ItineraryDetail() {
  const { slug } = useParams()
  const campaign = getCampaign(slug)
  const { t, pick } = useLang()
  usePageTitle(campaign ? `${campaign.title} · ${t('nav.itineraries')}` : undefined)
  const { openDonation } = useDonation()
  if (!campaign || !campaign.itinerary) return <NotFound />
  const completed = campaign.status === 'completed'

  return (
    <>
      <PageHero
        crumbs={[
          ['/itineraries', t('nav.itineraries')],
          [null, campaign.title],
        ]}
        eyebrow={pick(campaign.itinerary.title)}
        title={campaign.title}
        lede={pick(campaign.summary)}
      >
        <div className="tag-row mt-3">
          <StatusTag status={campaign.status} />
          {campaign.itinerary.draft && <span className="tag tag-draft">{t('status.draft')}</span>}
        </div>
        <div className="actions mt-4">
          {!completed && (
            <Link to={`/volunteer?expedition=${campaign.slug}`} className="btn btn-brand btn-lg">
              {t('itineraryDetail.register')}
            </Link>
          )}
          <Link to={`/campaigns/${campaign.slug}`} className="btn btn-ghost btn-lg">
            {t('itineraryDetail.aboutAppeal')}
          </Link>
        </div>
      </PageHero>

      <Section>
        <div className="split split-8-4">
          <Itinerary itinerary={campaign.itinerary} campaign={campaign} />
          <aside className="sticky stack" style={{ '--stack': '1.2rem' }}>
            <figure className="figure">
              <img src={campaign.image} alt="" />
            </figure>
            {!completed && (
              <div className="panel">
                <span className="eyebrow">{t('itineraryDetail.cantJoin')}</span>
                <p className="mt-2" style={{ color: 'var(--ink-2)' }}>
                  {t('itineraryDetail.cantJoinText')}
                </p>
                <button type="button" className="btn btn-ink btn-block mt-3" onClick={() => openDonation({ campaign: campaign.slug })}>
                  {t('itineraryDetail.giveTo', { title: campaign.title })}
                </button>
              </div>
            )}
          </aside>
        </div>
      </Section>

      <Section className="section-paper">
        <div className="section-head">
          <span className="eyebrow">{t('itineraryDetail.secretariatEyebrow')}</span>
          <h2>{t('itineraryDetail.secretariatTitle')}</h2>
          <p className="lede">{t('itineraryDetail.secretariatLede')}</p>
        </div>
        <Committee ids={campaign.contacts} message={t('itineraryDetail.volunteerMessage', { title: campaign.title })} />
      </Section>
    </>
  )
}
