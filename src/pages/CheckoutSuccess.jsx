import { Link, useLocation } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { getCampaign } from '../data/programs'
import { org, formatRM, whatsappLink } from '../data/organisation'
import { useLang } from '../i18n/LanguageContext'
import { PageHero, Section } from '../components/ui'

const readLast = () => {
  try {
    const raw = sessionStorage.getItem('kami.lastDonation')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function CheckoutSuccess() {
  const { t, pick } = useLang()
  usePageTitle(t('success.eyebrow'))
  const { state } = useLocation()
  const record = state ?? readLast()
  const campaign = record ? getCampaign(record.donation.campaign) : null
  const treasurer = org.committee.find((p) => p.id === 'halim')

  if (!record || !campaign) {
    return (
      <>
        <PageHero eyebrow={t('checkout.eyebrow')} title={t('success.emptyTitle')} />
        <Section>
          <Link to="/donate" className="btn btn-brand">
            {t('success.makeGift')}
          </Link>
        </Section>
      </>
    )
  }

  const { donation, donor, method, reference } = record
  const transfer = method === 'transfer'
  const amount = formatRM(donation.amount, { cents: true })
  const freq = t(`form.${donation.frequency}`).toLowerCase()
  const unitLabel = campaign.unit ? (donation.qty === 1 ? pick(campaign.unit.label) : pick(campaign.unit.labelPlural)) : ''
  const waText = t('success.proofMessage', { amount, title: campaign.title, reference, ref: donation.ref })

  return (
    <>
      <PageHero
        eyebrow={t('success.eyebrow')}
        title={t('success.title', { name: donor.name.split(' ')[0] })}
        lede={transfer ? t('success.ledeTransfer') : t('success.ledeOnline')}
      />
      <Section>
        <div className="steps" aria-label={t('checkout.progress')}>
          <span data-n="1" className="done">
            {t('checkout.stepGift')}
          </span>
          <span data-n="2" className="done">
            {t('checkout.stepDetails')}
          </span>
          <span data-n="3" className="on">
            {t('checkout.stepPayment')}
          </span>
        </div>
        <div className="checkout-grid">
          <div className="stack" style={{ '--stack': '2rem' }}>
            <div>
              <span className="eyebrow">{t('success.yourReference')}</span>
              <div className="ref-box mt-2 num">{reference}</div>
              <p className="small muted mt-2">{t('success.referenceNote')}</p>
            </div>

            {transfer ? (
              <div className="panel">
                <h3>{t('success.transferDetails')}</h3>
                <dl className="kv mt-3">
                  <dt>{t('success.amount')}</dt>
                  <dd className="num">
                    <strong>{amount}</strong>
                    {donation.frequency !== 'once' ? ` · ${freq}` : ''}
                  </dd>
                  <dt>{t('success.bank')}</dt>
                  <dd>{org.bank.name}</dd>
                  <dt>{t('success.account')}</dt>
                  <dd className="num">{org.bank.accountNoSpaced}</dd>
                  <dt>{t('success.name')}</dt>
                  <dd>{org.bank.accountName}</dd>
                  <dt>{t('success.reference')}</dt>
                  <dd>
                    <strong>{donation.ref}</strong>
                  </dd>
                </dl>
                <div className="mt-4" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <img className="qr" src={org.duitnowQr} alt={t('donate.qrAlt')} width="180" height="180" />
                  <div className="small" style={{ color: 'var(--ink-2)', maxWidth: '26ch' }}>
                    {t('success.qrText')}
                  </div>
                </div>
                {treasurer && (
                  <a className="btn btn-brand mt-4" href={whatsappLink(treasurer.whatsapp, waText)} target="_blank" rel="noreferrer">
                    {t('success.sendProof')}
                  </a>
                )}
                {donation.frequency !== 'once' && <p className="small muted mt-3">{t('success.recurringNote', { freq })}</p>}
              </div>
            ) : (
              <div className="panel notice-brand" style={{ borderColor: 'transparent' }}>
                <h3>{t('success.linkTitle')}</h3>
                <p className="mt-2" style={{ color: 'var(--ink-2)' }}>
                  {t('success.linkText', { amount, email: donor.email })}{' '}
                  <Link to="/donate#transfer" className="text-link">
                    {t('success.donationPage')}
                  </Link>
                  .
                </p>
              </div>
            )}

            <div className="actions">
              <Link to="/" className="btn btn-ghost">
                {t('common.backHome')}
              </Link>
              <a href={org.facebook} className="btn btn-ghost" target="_blank" rel="noreferrer">
                {t('success.followFacebook')}
              </a>
            </div>
          </div>

          <aside className="panel">
            <span className="eyebrow">{t('success.summary')}</span>
            <h3 className="mt-2">{campaign.title}</h3>
            <div className="mt-3">
              <div className="summary-line">
                <span>{t('success.donor')}</span>
                <span>{donor.anonymous ? `${donor.name} (${t('success.private')})` : donor.name}</span>
              </div>
              <div className="summary-line">
                <span>{t('success.email')}</span>
                <span>{donor.email}</span>
              </div>
              {donation.qty ? (
                <div className="summary-line">
                  <span>
                    {donation.qty} × {unitLabel}
                  </span>
                  <span className="num">{t('checkout.each', { price: formatRM(donation.unitPrice) })}</span>
                </div>
              ) : null}
              {donor.names?.length > 0 && (
                <div className="summary-line">
                  <span>{t('success.inTheNameOf')}</span>
                  <span style={{ textAlign: 'right' }}>{donor.names.join(', ')}</span>
                </div>
              )}
              <div className="summary-line">
                <span>{t('success.method')}</span>
                <span>{transfer ? t('success.methodTransfer') : t('success.methodOnline')}</span>
              </div>
              <div className="summary-total">
                <span>{t('success.total')}</span>
                <span className="big num">{amount}</span>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
