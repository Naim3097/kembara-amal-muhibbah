import { org, whatsappLink } from '../data/organisation'
import { useLang } from '../i18n/LanguageContext'

export default function Committee({ ids, message }) {
  const { t, pick } = useLang()
  const people = ids ? org.committee.filter((p) => ids.includes(p.id)) : org.committee
  const text = message ?? t('committee.defaultMessage')
  return (
    <div className="people">
      {people.map((p) => (
        <div className="person" key={p.id}>
          <div className="person-role">{pick(p.role)}</div>
          <div className="person-name">{p.name}</div>
          <div className="person-contact">
            <a href={`tel:+${p.whatsapp}`}>{p.phone}</a>
            <a href={whatsappLink(p.whatsapp, text)} target="_blank" rel="noreferrer">
              {t('committee.whatsapp')}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
