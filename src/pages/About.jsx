import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { org } from '../data/organisation'
import { PageHero, Section } from '../components/ui'
import Committee from '../components/Committee'
import { useDonation } from '../context/DonationContext'
import { useLang } from '../i18n/LanguageContext'

export default function About() {
  const { t, pick, lang } = useLang()
  usePageTitle(t('about.eyebrow'))
  const { openDonation } = useDonation()
  return (
    <>
      <PageHero eyebrow={t('about.eyebrow')} title={t('about.title')} lede={t('about.lede')} />

      <Section>
        <div className="split">
          <figure className="figure">
            <img src="/images/kenduri-serving-01.jpg" alt={t('about.figure1Alt')} />
            <figcaption>{t('about.figure1')}</figcaption>
          </figure>
          <div className="prose">
            <span className="eyebrow">{t('about.storyEyebrow')}</span>
            <h2 className="mt-2 mb-3">{t('about.storyTitle')}</h2>
            <p>{t('about.story1')}</p>
            <p>{t('about.story2')}</p>
            <p>{t('about.story3')}</p>
            <blockquote className="callout mt-4">
              <span className="serif italic" style={{ fontSize: '1.15rem' }}>
                {org.mission}
              </span>
              {lang === 'en' && (
                <span className="small muted" style={{ display: 'block', marginTop: '.4rem' }}>
                  {org.missionEn}
                </span>
              )}
            </blockquote>
          </div>
        </div>
      </Section>

      <Section className="section-paper">
        <div className="section-head">
          <span className="eyebrow">{t('about.valuesEyebrow')}</span>
          <h2>{t('about.valuesTitle')}</h2>
        </div>
        <div className="grid grid-4" style={{ '--gap': '2rem' }}>
          {org.values.map((v) => (
            <div key={v.ms} className="person" style={{ paddingTop: '1.2rem' }}>
              <h3>{v.ms}</h3>
              {lang === 'en' && <span className="pillar-ms serif italic muted">{v.en}</span>}
              <p className="mt-2" style={{ color: 'var(--ink-2)', fontSize: '.98rem' }}>
                {pick(v.text)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="split">
          <div>
            <span className="eyebrow">{t('about.whereEyebrow')}</span>
            <h2 className="mt-2">{t('about.whereTitle')}</h2>
            <dl className="kv mt-4">
              <dt>{t('about.community')}</dt>
              <dd>{t('about.communityText')}</dd>
              <dt>{t('about.district')}</dt>
              <dd>{t('about.districtText')}</dd>
              <dt>{t('about.households')}</dt>
              <dd>{t('about.householdsText')}</dd>
              <dt>{t('about.partners')}</dt>
              <dd>{t('about.partnersText')}</dd>
            </dl>
          </div>
          <div className="prose">
            <p>{t('about.where1')}</p>
            <p>{t('about.where2')}</p>
            <figure className="figure mt-4">
              <img src="/images/kenduri-crowd.jpg" alt={t('about.figure2Alt')} />
              <figcaption>{t('about.figure2')}</figcaption>
            </figure>
          </div>
        </div>
      </Section>

      <Section className="section-paper">
        <div className="section-head-row">
          <div className="section-head">
            <span className="eyebrow">{t('about.committeeEyebrow')}</span>
            <h2>{t('about.committeeTitle')}</h2>
          </div>
          <Link to="/contact" className="text-link">
            {t('about.committeeLink')}
          </Link>
        </div>
        <Committee />
      </Section>

      <Section>
        <div className="split">
          <div>
            <span className="eyebrow">{t('about.govEyebrow')}</span>
            <h2 className="mt-2">{t('about.govTitle')}</h2>
          </div>
          <div className="prose">
            <p>{t('about.gov1', { bank: org.bank.name, name: org.bank.accountName })}</p>
            <p>{t('about.gov2')}</p>
            <dl className="kv mt-4">
              <dt>{t('about.bank')}</dt>
              <dd>
                {org.bank.name} · <span className="num">{org.bank.accountNoSpaced}</span>
              </dd>
              <dt>{t('about.accountName')}</dt>
              <dd>{org.bank.accountName}</dd>
              <dt>{t('about.email')}</dt>
              <dd>
                <a className="text-link" href={`mailto:${org.email}`}>
                  {org.email}
                </a>
              </dd>
            </dl>
            <div className="actions mt-4">
              <button type="button" className="btn btn-brand" onClick={() => openDonation()}>
                {t('common.donate')}
              </button>
              <Link to="/volunteer" className="btn btn-ghost">
                {t('common.volunteer')}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
