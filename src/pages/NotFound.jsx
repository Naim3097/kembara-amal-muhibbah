import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import { useLang } from '../i18n/LanguageContext'
import { PageHero, Section } from '../components/ui'

export default function NotFound() {
  const { t } = useLang()
  usePageTitle('404')
  return (
    <>
      <PageHero eyebrow="404" title={t('notFound.title')} lede={t('notFound.lede')} />
      <Section>
        <div className="actions">
          <Link to="/" className="btn btn-ink">
            {t('common.backHome')}
          </Link>
          <Link to="/programs" className="btn btn-ghost">
            {t('common.programmes')}
          </Link>
        </div>
      </Section>
    </>
  )
}
