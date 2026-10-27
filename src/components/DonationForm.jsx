import { useEffect, useMemo, useState } from 'react'
import { campaigns, getCampaign } from '../data/programs'
import { formatRM } from '../data/organisation'
import { useLang } from '../i18n/LanguageContext'

const defaultsFor = (campaign) => ({
  frequency: 'once',
  amount: campaign.tiers ? campaign.tiers[1] ?? campaign.tiers[0] : 0,
  custom: '',
  qty: campaign.unit ? campaign.unit.tiersQty[0] : 1,
})

/**
 * Shared donation form used by the pop-up and the /donate page.
 * Calls onContinue(pending) with a normalised donation object.
 */
export default function DonationForm({ initialCampaign, onContinue, compact = false }) {
  const { t, pick } = useLang()
  const options = useMemo(() => campaigns.filter((c) => c.status !== 'completed'), [])
  const resolve = (slug) => (slug && options.some((c) => c.slug === slug) ? slug : options[0].slug)

  const [slug, setSlug] = useState(() => resolve(initialCampaign))
  const campaign = getCampaign(slug)
  const [state, setState] = useState(() => defaultsFor(campaign))

  useEffect(() => {
    const next = resolve(initialCampaign)
    setSlug(next)
    setState(defaultsFor(getCampaign(next)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCampaign])

  const choose = (next) => {
    setSlug(next)
    setState(defaultsFor(getCampaign(next)))
  }

  const unit = campaign.unit
  const unitLabel = unit ? pick(unit.label) : ''
  const unitPlural = unit ? pick(unit.labelPlural) : ''
  const total = unit ? state.qty * unit.price : state.custom !== '' ? Number(state.custom) : state.amount
  const valid = Number.isFinite(total) && total >= 1 && (!unit || (state.qty >= 1 && state.qty <= unit.max))

  const setQty = (q) => setState((s) => ({ ...s, qty: Math.max(1, Math.min(unit?.max ?? 999, Math.floor(Number(q) || 1))) }))
  const freqLabel = (f) => t(`form.${f}`)

  const submit = (e) => {
    e.preventDefault()
    if (!valid) return
    onContinue({
      campaign: campaign.slug,
      title: campaign.title,
      ref: campaign.ref,
      frequency: state.frequency,
      qty: unit ? state.qty : null,
      unitPrice: unit ? unit.price : null,
      amount: total,
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <form className="dform" onSubmit={submit} noValidate>
      <div className="dform-section">
        <span className="field-label">{t('form.where')}</span>
        {compact ? (
          <select className="select" value={slug} onChange={(e) => choose(e.target.value)} aria-label={t('form.campaign')}>
            {options.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title} — {pick(c.dateLabel)}
              </option>
            ))}
          </select>
        ) : (
          <div className="option-list" role="radiogroup" aria-label={t('form.campaign')}>
            {options.map((c) => (
              <label key={c.slug} className="option" data-checked={c.slug === slug}>
                <input type="radio" name="campaign" value={c.slug} checked={c.slug === slug} onChange={() => choose(c.slug)} />
                <span>
                  <span className="option-title">{c.title}</span>
                  <span className="option-sub">{pick(c.dateLabel)}</span>
                </span>
                <span className="option-end">
                  {c.unit
                    ? t('common.perUnit', { price: formatRM(c.unit.price), unit: pick(c.unit.label) })
                    : c.target
                      ? t('common.target', { amount: formatRM(c.target) })
                      : t('common.anyAmount')}
                </span>
              </label>
            ))}
          </div>
        )}
        {compact && <p className="dform-fineprint">{pick(campaign.summary)}</p>}
      </div>

      {campaign.frequencies.length > 1 && (
        <div className="dform-section">
          <span className="field-label">{t('form.howOften')}</span>
          <div className="seg seg-block" role="group" aria-label={t('form.frequency')}>
            {campaign.frequencies.map((f) => (
              <button key={f} type="button" aria-pressed={state.frequency === f} onClick={() => setState((s) => ({ ...s, frequency: f }))}>
                {freqLabel(f)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="dform-section">
        {unit ? (
          <>
            <span className="field-label">
              {t('form.howMany', { units: unitPlural })}{' '}
              <span className="muted" style={{ fontWeight: 500 }}>
                {t('form.each', { price: formatRM(unit.price) })}
              </span>
            </span>
            <div className="amounts">
              {unit.tiersQty.map((q) => (
                <button key={q} type="button" className="amount" aria-pressed={state.qty === q} onClick={() => setQty(q)}>
                  {q} {q === 1 ? unitLabel : unitPlural}
                  <small>{formatRM(q * unit.price)}</small>
                </button>
              ))}
            </div>
            <div className="qty-row">
              <span className="small muted">{t('form.orNumber')}</span>
              <div className="qty">
                <button type="button" aria-label={t('form.fewer')} onClick={() => setQty(state.qty - 1)}>
                  –
                </button>
                <input
                  type="number"
                  min="1"
                  max={unit.max}
                  value={state.qty}
                  onChange={(e) => setQty(e.target.value)}
                  aria-label={t('form.numberOf', { units: unitPlural })}
                />
                <button type="button" aria-label={t('form.more')} onClick={() => setQty(state.qty + 1)}>
                  +
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="field-label">{t('form.chooseAmount')}</span>
            <div className="amounts">
              {campaign.tiers.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  className="amount"
                  aria-pressed={state.custom === '' && state.amount === tier}
                  onClick={() => setState((s) => ({ ...s, amount: tier, custom: '' }))}
                >
                  {formatRM(tier)}
                </button>
              ))}
            </div>
            <div className="input-prefix">
              <span>RM</span>
              <input
                type="number"
                inputMode="decimal"
                min="1"
                step="1"
                placeholder={t('form.otherAmount')}
                value={state.custom}
                onChange={(e) => setState((s) => ({ ...s, custom: e.target.value }))}
                aria-label={t('form.otherAmountLabel')}
              />
            </div>
          </>
        )}
      </div>

      <div className="dform-foot">
        <div className="dform-total">
          <span>
            {state.frequency === 'once' ? t('form.yourGift') : t('form.freqGift', { freq: freqLabel(state.frequency).toLowerCase() })}
            {unit && state.qty > 0 ? ` · ${state.qty} ${state.qty === 1 ? unitLabel : unitPlural}` : ''}
          </span>
          <span className="big num">{valid ? formatRM(total, { cents: true }) : '—'}</span>
        </div>
        <button type="submit" className="btn btn-brand btn-lg btn-block" disabled={!valid}>
          {t('form.continueCheckout')}
        </button>
        <p className="dform-fineprint">
          {t('form.fineprint')} <strong>{campaign.ref}</strong>.
        </p>
      </div>
    </form>
  )
}
