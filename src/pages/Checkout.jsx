import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { useDonation } from '../context/DonationContext'
import { useLang } from '../i18n/LanguageContext'
import { getCampaign } from '../data/programs'
import { org, formatRM } from '../data/organisation'
import { PageHero, Section } from '../components/ui'

const METHODS = [
  { id: 'fpx', soon: true },
  { id: 'card', soon: true },
  { id: 'ewallet', soon: true },
  { id: 'transfer', soon: false },
]

const makeRef = () => {
  const d = new Date()
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `KAMI-${ymd}-${rand}`
}

export default function Checkout() {
  const { t, pick } = useLang()
  usePageTitle(t('checkout.eyebrow'))
  const navigate = useNavigate()
  const { pending, setPending } = useDonation()
  const campaign = pending ? getCampaign(pending.campaign) : null

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    anonymous: false,
    message: '',
    names: [],
    method: 'transfer',
    consent: false,
  })
  const [errors, setErrors] = useState({})

  if (!pending || !campaign) {
    return (
      <>
        <PageHero eyebrow={t('checkout.eyebrow')} title={t('checkout.emptyTitle')} lede={t('checkout.emptyLede')} />
        <Section>
          <Link to="/donate" className="btn btn-brand">
            {t('checkout.goDonate')}
          </Link>
        </Section>
      </>
    )
  }

  const isQurban = campaign.kind === 'qurban'
  const nameSlots = isQurban ? Math.min(pending.qty, 7) : 0
  const unitLabel = campaign.unit ? (pending.qty === 1 ? pick(campaign.unit.label) : pick(campaign.unit.labelPlural)) : ''
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const setName = (i) => (e) =>
    setForm((f) => {
      const names = [...f.names]
      names[i] = e.target.value
      return { ...f, names }
    })

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = t('checkout.errName')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t('checkout.errEmail')
    if (form.phone && !/^[0-9+\-\s()]{8,}$/.test(form.phone)) next.phone = t('checkout.errPhone')
    if (!form.consent) next.consent = t('checkout.errConsent')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const record = {
      reference: makeRef(),
      donation: pending,
      donor: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        anonymous: form.anonymous,
        message: form.message.trim(),
        names: form.names.filter(Boolean),
      },
      method: form.method,
      createdAt: new Date().toISOString(),
    }
    try {
      sessionStorage.setItem('kami.lastDonation', JSON.stringify(record))
    } catch {
      /* ignore */
    }
    setPending(null)
    navigate('/checkout/success', { state: record })
  }

  const method = METHODS.find((m) => m.id === form.method)

  return (
    <>
      <PageHero eyebrow={t('checkout.eyebrow')} title={t('checkout.title')} />
      <Section>
        <div className="steps" aria-label={t('checkout.progress')}>
          <span data-n="1" className="done">
            {t('checkout.stepGift')}
          </span>
          <span data-n="2" className="on">
            {t('checkout.stepDetails')}
          </span>
          <span data-n="3">{t('checkout.stepPayment')}</span>
        </div>

        <div className="checkout-grid">
          <form className="form" onSubmit={submit} noValidate>
            <fieldset className="fieldset">
              <legend>{t('checkout.donor')}</legend>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">{t('checkout.fullName')}</label>
                  <input id="name" className="input" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} autoComplete="name" />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="email">{t('checkout.email')}</label>
                  <input id="email" type="email" className="input" value={form.email} onChange={set('email')} aria-invalid={!!errors.email} autoComplete="email" />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="phone">{t('checkout.phone')}</label>
                  <input id="phone" type="tel" className="input" value={form.phone} onChange={set('phone')} aria-invalid={!!errors.phone} autoComplete="tel" placeholder="012-345 6789" />
                  <span className="hint">{t('checkout.phoneHint')}</span>
                  {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <div className="field">
                  <span className="field-label">{t('checkout.visibility')}</span>
                  <label className="check" style={{ marginTop: '.6rem' }}>
                    <input type="checkbox" checked={form.anonymous} onChange={set('anonymous')} />
                    <span>{t('checkout.anonymous')}</span>
                  </label>
                </div>
              </div>
            </fieldset>

            {isQurban && (
              <fieldset className="fieldset">
                <legend>{t('checkout.qurbanNames')}</legend>
                <p className="small muted">{t('checkout.qurbanHint')}</p>
                {Array.from({ length: nameSlots }).map((_, i) => (
                  <div className="field" key={i}>
                    <label htmlFor={`share-${i}`}>{t('checkout.share', { n: i + 1 })}</label>
                    <input id={`share-${i}`} className="input" value={form.names[i] ?? ''} onChange={setName(i)} />
                  </div>
                ))}
                {pending.qty > 7 && <p className="small muted">{t('checkout.qurbanMore')}</p>}
              </fieldset>
            )}

            <fieldset className="fieldset">
              <legend>{t('checkout.message')}</legend>
              <div className="field">
                <label htmlFor="message">{t('checkout.messageLabel')}</label>
                <textarea id="message" className="textarea" value={form.message} onChange={set('message')} style={{ minHeight: 90 }} />
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend>{t('checkout.method')}</legend>
              <div className="option-list">
                {METHODS.map((m) => (
                  <label key={m.id} className="option" data-checked={form.method === m.id}>
                    <input type="radio" name="method" value={m.id} checked={form.method === m.id} onChange={set('method')} />
                    <span>
                      <span className="option-title">{t(`checkout.methods.${m.id}`)}</span>
                      <span className="option-sub">{t(`checkout.methods.${m.id}Sub`)}</span>
                    </span>
                    <span className="option-end">{m.soon ? t('checkout.soon') : t('checkout.available')}</span>
                  </label>
                ))}
              </div>
              {method?.soon && <div className="notice notice-brand">{t('checkout.soonNotice')}</div>}
              {form.method === 'transfer' && (
                <div className="notice">
                  {t('checkout.transferNotice', {
                    amount: formatRM(pending.amount, { cents: true }),
                    bank: org.bank.name,
                    acct: org.bank.accountNoSpaced,
                    name: org.bank.accountName,
                    ref: pending.ref,
                  })}
                </div>
              )}
            </fieldset>

            <label className="check">
              <input type="checkbox" checked={form.consent} onChange={set('consent')} />
              <span>
                {t('checkout.consent')}{' '}
                <Link to="/privacy" className="text-link">
                  {t('checkout.privacyPolicy')}
                </Link>
                .
              </span>
            </label>
            {errors.consent && <span className="error">{errors.consent}</span>}

            <div className="actions">
              <button type="submit" className="btn btn-brand btn-lg">
                {method?.soon ? t('checkout.recordPledge') : t('checkout.confirmTransfer')}
              </button>
              <Link to={`/donate?campaign=${pending.campaign}`} className="btn btn-ghost btn-lg">
                {t('checkout.changeGift')}
              </Link>
            </div>
          </form>

          <aside className="panel sticky">
            <span className="eyebrow">{t('checkout.yourGift')}</span>
            <h3 className="mt-2">{campaign.title}</h3>
            <p className="small muted mt-1">{pick(campaign.dateLabel)}</p>
            <div className="mt-3">
              <div className="summary-line">
                <span>{t('checkout.frequency')}</span>
                <span>{t(`form.${pending.frequency}`)}</span>
              </div>
              {pending.qty ? (
                <div className="summary-line">
                  <span>
                    {pending.qty} × {unitLabel}
                  </span>
                  <span className="num">{t('checkout.each', { price: formatRM(pending.unitPrice) })}</span>
                </div>
              ) : null}
              <div className="summary-line">
                <span>{t('checkout.reference')}</span>
                <span>{pending.ref}</span>
              </div>
              <div className="summary-total">
                <span>{t('checkout.total')}</span>
                <span className="big num">{formatRM(pending.amount, { cents: true })}</span>
              </div>
            </div>
            <p className="small muted mt-3">{t('checkout.feesNote')}</p>
          </aside>
        </div>
      </Section>
    </>
  )
}
