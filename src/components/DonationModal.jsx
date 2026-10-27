import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDonation } from '../context/DonationContext'
import { useLang } from '../i18n/LanguageContext'
import { getCampaign } from '../data/programs'
import DonationForm from './DonationForm'

export default function DonationModal() {
  const { modal, closeDonation, setPending } = useDonation()
  const { t } = useLang()
  const navigate = useNavigate()
  const panel = useRef(null)

  useEffect(() => {
    if (!modal.open) return undefined
    const previous = document.activeElement
    panel.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') closeDonation()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      if (previous && typeof previous.focus === 'function') previous.focus()
    }
  }, [modal.open, closeDonation])

  if (!modal.open) return null

  const campaign = modal.campaign ? getCampaign(modal.campaign) : null
  const heading = campaign && campaign.status !== 'completed' ? campaign.title : t('modal.support')

  return (
    <div className="modal-root">
      <div className="modal-backdrop" onClick={closeDonation} aria-hidden="true" />
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="donate-title" tabIndex={-1} ref={panel}>
        <div className="modal-head">
          <div>
            <span className="eyebrow eyebrow-brand">{modal.auto ? t('modal.beforeYouGo') : t('modal.makeGift')}</span>
            <h2 id="donate-title">{heading}</h2>
            {modal.auto && <p className="muted mt-1">{t('modal.autoText')}</p>}
          </div>
          <button type="button" className="modal-close" onClick={closeDonation}>
            {t('common.close')}
          </button>
        </div>
        <DonationForm
          compact
          initialCampaign={campaign?.status !== 'completed' ? modal.campaign : null}
          onContinue={(pendingDonation) => {
            setPending(pendingDonation)
            closeDonation()
            navigate('/checkout')
          }}
        />
      </div>
    </div>
  )
}
