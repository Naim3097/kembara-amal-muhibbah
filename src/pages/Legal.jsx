import usePageTitle from '../hooks/usePageTitle'
import { org } from '../data/organisation'
import { useLang } from '../i18n/LanguageContext'
import { PageHero, Section } from '../components/ui'

export default function Legal({ kind }) {
  const { t } = useLang()
  const page = t(`legal.${kind}`)
  usePageTitle(page.title)
  const vars = { name: org.name, legalName: org.legalName, email: org.email, bank: org.bank.name, acct: org.bank.accountNoSpaced }
  const fill = (s) => s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m))
  return (
    <>
      <PageHero eyebrow={t('legal.eyebrow')} title={page.title} lede={page.lede} />
      <Section>
        <div className="container-narrow prose" style={{ marginInline: 0 }}>
          {page.sections.map(([h, body]) => (
            <div key={h}>
              <h3>{h}</h3>
              <p>{fill(body)}</p>
            </div>
          ))}
          <p className="small muted mt-6">{t('common.lastUpdated')}</p>
        </div>
      </Section>
    </>
  )
}
