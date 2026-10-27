import { useNavigate, useSearchParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { org, whatsappLink } from '../data/organisation'
import { useDonation } from '../context/DonationContext'
import { useLang } from '../i18n/LanguageContext'
import { PageHero, Section } from '../components/ui'
import DonationForm from '../components/DonationForm'

export default function Donate() {
  const { t } = useLang()
  usePageTitle(t('donate.eyebrow'))
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { setPending } = useDonation()
  const treasurer = org.committee.find((p) => p.id === 'halim')

  return (
    <>
      <PageHero eyebrow={t('donate.eyebrow')} title={t('donate.title')} lede={t('donate.lede')} />
      <Section>
        <div className="checkout-grid">
          <div>
            <DonationForm
              initialCampaign={params.get('campaign')}
              onContinue={(pending) => {
                setPending(pending)
                navigate('/checkout')
              }}
            />
          </div>
          <aside className="stack" style={{ '--stack': '1.2rem' }} id="transfer">
            <div className="panel">
              <span className="eyebrow">{t('donate.bank')}</span>
              <div className="bank-card mt-2">
                <span className="small muted">{org.bank.name}</span>
                <span className="acct num">{org.bank.accountNoSpaced}</span>
                <span>{org.bank.accountName}</span>
              </div>
              <p className="small muted mt-3">{t('donate.bankText')}</p>
              {treasurer && (
                <a className="btn btn-ghost btn-sm mt-3" href={whatsappLink(treasurer.whatsapp, t('donate.proofMessage'))} target="_blank" rel="noreferrer">
                  {t('donate.whatsappProof')}
                </a>
              )}
            </div>
            <div className="panel panel-paper">
              <span className="eyebrow">{t('donate.qr')}</span>
              <div className="mt-3" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <img className="qr" src={org.duitnowQr} alt={t('donate.qrAlt')} width="180" height="180" />
                <div className="small" style={{ color: 'var(--ink-2)', maxWidth: '22ch' }}>
                  {t('donate.qrText')}
                </div>
              </div>
            </div>
            <div className="panel panel-paper">
              <span className="eyebrow">{t('donate.next')}</span>
              <ul className="checklist mt-3">
                <li>{t('donate.next1')}</li>
                <li>{t('donate.next2')}</li>
                <li>{t('donate.next3')}</li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
