import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import { org } from '../data/organisation'
import { useLang } from '../i18n/LanguageContext'
import { PageHero, Section } from '../components/ui'
import Committee from '../components/Committee'

export default function Contact() {
  const { t, pick } = useLang()
  usePageTitle(t('contact.eyebrow'))
  const subjects = t('contact.subjects')
  const [form, setForm] = useState({ name: '', email: '', subject: 0, message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const subjectText = subjects[Number(form.subject)] ?? subjects[0]
  const mailto = `mailto:${org.email}?subject=${encodeURIComponent(`${t('contact.subjectPrefix')} ${subjectText}`)}&body=${encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)}`

  return (
    <>
      <PageHero eyebrow={t('contact.eyebrow')} title={t('contact.title')} lede={t('contact.lede')} />

      <Section>
        <div className="split">
          <div className="stack" style={{ '--stack': '2rem' }}>
            <dl className="kv">
              <dt>{t('contact.email')}</dt>
              <dd>
                <a className="text-link" href={`mailto:${org.email}`}>
                  {org.email}
                </a>
              </dd>
              <dt>{t('contact.facebook')}</dt>
              <dd>
                <a className="text-link" href={org.facebook} target="_blank" rel="noreferrer">
                  Kembara Amal Muhibbah - KAMI
                </a>
              </dd>
              <dt>{t('contact.where')}</dt>
              <dd>{pick(org.operatingArea)}</dd>
              <dt>{t('contact.bank')}</dt>
              <dd>
                {org.bank.name} <span className="num">{org.bank.accountNoSpaced}</span>
                <br />
                {org.bank.accountName}
              </dd>
            </dl>
          </div>

          {sent ? (
            <div className="form-ok">
              <strong>{t('contact.okTitle', { name: form.name })}</strong> {t('contact.okText')}{' '}
              <a className="text-link" href={mailto}>
                {t('contact.okLink')}
              </a>
              .
            </div>
          ) : (
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault()
                if (form.name && form.email && form.message) setSent(true)
              }}
            >
              <div className="form-row">
                <div className="field">
                  <label htmlFor="c-name">{t('contact.name')}</label>
                  <input id="c-name" className="input" required value={form.name} onChange={set('name')} autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="c-email">{t('contact.email')}</label>
                  <input id="c-email" className="input" type="email" required value={form.email} onChange={set('email')} autoComplete="email" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-subject">{t('contact.subject')}</label>
                <select id="c-subject" className="select" value={form.subject} onChange={set('subject')}>
                  {subjects.map((s, i) => (
                    <option key={s} value={i}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="c-message">{t('contact.message')}</label>
                <textarea id="c-message" className="textarea" required value={form.message} onChange={set('message')} />
              </div>
              <div>
                <button type="submit" className="btn btn-brand btn-lg">
                  {t('contact.send')}
                </button>
              </div>
            </form>
          )}
        </div>
      </Section>

      <Section className="section-paper">
        <div className="section-head">
          <span className="eyebrow">{t('contact.committeeEyebrow')}</span>
          <h2>{t('contact.committeeTitle')}</h2>
        </div>
        <Committee />
      </Section>
    </>
  )
}
