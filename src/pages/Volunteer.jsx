import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { itineraries, activeCampaigns } from '../data/programs'
import { org, whatsappLink, formatRM } from '../data/organisation'
import { useLang } from '../i18n/LanguageContext'
import { PageHero, Section, StatusTag } from '../components/ui'

export default function Volunteer() {
  const { t, pick } = useLang()
  usePageTitle(t('volunteer.eyebrow'))
  const [params] = useSearchParams()
  const trips = activeCampaigns().filter((c) => c.kind !== 'recurring')
  const plans = itineraries().filter((c) => c.status !== 'completed')
  const secretary = org.committee.find((p) => p.id === 'azrul')
  const roles = t('volunteer.roles')

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    expedition: params.get('expedition') ?? '',
    role: '',
    vehicle: 'no',
    notes: '',
  })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setSent(true)
  }

  const vehicleLabels = { no: t('volunteer.vehicleNo'), car: t('volunteer.vehicleCar'), '4x4': t('volunteer.vehicle4x4') }
  const waMessage = [
    t('volunteer.waIntro'),
    `${t('volunteer.waName')}: ${form.name}`,
    `${t('volunteer.waPhone')}: ${form.phone}`,
    `${t('volunteer.waExpedition')}: ${form.expedition || t('volunteer.any')}`,
    `${t('volunteer.waRole')}: ${form.role || t('volunteer.any')}`,
    `${t('volunteer.waVehicle')}: ${vehicleLabels[form.vehicle]}`,
    form.notes,
  ].join('\n')

  return (
    <>
      <PageHero eyebrow={t('volunteer.eyebrow')} title={t('volunteer.title')} lede={t('volunteer.lede')} />

      <Section>
        <div className="section-head">
          <span className="eyebrow">{t('volunteer.rolesEyebrow')}</span>
          <h2>{t('volunteer.rolesTitle')}</h2>
        </div>
        <div className="grid grid-3" style={{ '--gap': '2rem' }}>
          {roles.map((r, i) => (
            <div key={r.title} className="person" style={{ paddingTop: '1.2rem' }}>
              <span className="pillar-index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2" style={{ fontSize: '1.4rem' }}>
                {r.title}
              </h3>
              <p className="mt-2" style={{ color: 'var(--ink-2)', fontSize: '.98rem' }}>
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="section-paper">
        <div className="section-head-row">
          <div className="section-head">
            <span className="eyebrow">{t('volunteer.tripsEyebrow')}</span>
            <h2>{t('volunteer.tripsTitle')}</h2>
          </div>
          <Link to="/itineraries" className="text-link">
            {t('volunteer.allItineraries')}
          </Link>
        </div>
        <div className="rows">
          {plans.map((c) => (
            <Link to={`/itineraries/${c.slug}`} className="row" key={c.slug}>
              <div className="row-date">
                {t('common.days', { n: c.itinerary.days.length })}
                <small>{c.itinerary.draft ? t('common.draftSchedule') : t('common.confirmed')}</small>
              </div>
              <div>
                <div className="row-title">{c.title}</div>
                <div className="row-sub">
                  {pick(c.dateLabel)} · {pick(c.location)}
                </div>
              </div>
              <div className="row-end">
                {c.itinerary.fee?.amount != null && <span className="meta num">{t('common.contribution', { amount: formatRM(c.itinerary.fee.amount) })}</span>}
                <StatusTag status={c.status} />
              </div>
            </Link>
          ))}
        </div>
        <p className="small muted mt-3">{t('volunteer.tripsNote')}</p>
      </Section>

      <Section>
        <div className="split">
          <div>
            <span className="eyebrow">{t('volunteer.registerEyebrow')}</span>
            <h2 className="mt-2">{t('volunteer.registerTitle')}</h2>
            <p className="mt-3" style={{ color: 'var(--ink-2)' }}>
              {t('volunteer.registerText')}
            </p>
            {secretary && (
              <a className="btn btn-ghost mt-3" href={whatsappLink(secretary.whatsapp, t('volunteer.secretaryMessage'))} target="_blank" rel="noreferrer">
                {t('volunteer.whatsappSecretary')}
              </a>
            )}
          </div>
          {sent ? (
            <div className="form-ok">
              <strong>{t('volunteer.okTitle', { name: form.name })}</strong> {t('volunteer.okText')}{' '}
              {secretary && (
                <a className="text-link" href={whatsappLink(secretary.whatsapp, waMessage)} target="_blank" rel="noreferrer">
                  {t('volunteer.okLink')}
                </a>
              )}
              .
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="v-name">{t('volunteer.fullName')}</label>
                  <input id="v-name" className="input" required value={form.name} onChange={set('name')} autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="v-phone">{t('volunteer.phone')}</label>
                  <input id="v-phone" className="input" type="tel" required value={form.phone} onChange={set('phone')} autoComplete="tel" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="v-email">{t('volunteer.email')}</label>
                <input id="v-email" className="input" type="email" value={form.email} onChange={set('email')} autoComplete="email" />
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="v-exp">{t('volunteer.expedition')}</label>
                  <select id="v-exp" className="select" value={form.expedition} onChange={set('expedition')}>
                    <option value="">{t('volunteer.anyExpedition')}</option>
                    {trips.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title} · {pick(c.dateLabel)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="v-role">{t('volunteer.role')}</label>
                  <select id="v-role" className="select" value={form.role} onChange={set('role')}>
                    <option value="">{t('volunteer.anyRole')}</option>
                    {roles.map((r) => (
                      <option key={r.title} value={r.title}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <span className="field-label">{t('volunteer.vehicle')}</span>
                <div className="seg" role="group" aria-label={t('volunteer.vehicle')}>
                  {['no', 'car', '4x4'].map((v) => (
                    <button key={v} type="button" aria-pressed={form.vehicle === v} onClick={() => setForm((f) => ({ ...f, vehicle: v }))}>
                      {vehicleLabels[v]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label htmlFor="v-notes">{t('volunteer.notes')}</label>
                <textarea id="v-notes" className="textarea" value={form.notes} onChange={set('notes')} placeholder={t('volunteer.notesPlaceholder')} />
              </div>
              <div>
                <button type="submit" className="btn btn-brand btn-lg">
                  {t('volunteer.submit')}
                </button>
              </div>
            </form>
          )}
        </div>
      </Section>
    </>
  )
}
