import { useState } from 'react'
import { formatRM } from '../data/organisation'
import { useLang } from '../i18n/LanguageContext'

export default function Itinerary({ itinerary, campaign }) {
  const { t, pick } = useLang()
  const [day, setDay] = useState(0)
  const current = itinerary.days[day]

  return (
    <div className="stack" style={{ '--stack': '2rem' }}>
      {itinerary.draft && (
        <div className="notice">
          <strong>{t('itinerary.draftTitle')}</strong> {t('itinerary.draftNotice')}
        </div>
      )}

      <dl className="kv">
        <dt>{t('itinerary.location')}</dt>
        <dd>{pick(campaign.location)}</dd>
        <dt>{t('itinerary.dates')}</dt>
        <dd>{pick(campaign.dateLabel)}</dd>
        <dt>{t('itinerary.meetingPoint')}</dt>
        <dd>{pick(itinerary.meetingPoint)}</dd>
        <dt>{t('itinerary.transport')}</dt>
        <dd>{pick(itinerary.transport)}</dd>
      </dl>

      <div>
        <div className="day-tabs" role="tablist" aria-label={t('itinerary.daysLabel')}>
          {itinerary.days.map((d, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              className="day-tab"
              aria-selected={i === day}
              aria-controls={`day-panel-${i}`}
              id={`day-tab-${i}`}
              onClick={() => setDay(i)}
            >
              {pick(d.label)}
              {d.date ? ` · ${pick(d.date)}` : ''}
            </button>
          ))}
        </div>
        <div className="timeline" role="tabpanel" id={`day-panel-${day}`} aria-labelledby={`day-tab-${day}`}>
          {current.items.map((item) => (
            <div className="tl-item" key={`${item.time}-${pick(item.title)}`}>
              <div className="tl-time">{item.time}</div>
              <div>
                <div className="tl-title">{pick(item.title)}</div>
                {item.note && <div className="tl-note">{pick(item.note)}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-2" style={{ '--gap': '2rem' }}>
        {itinerary.fee && (
          <div className="panel panel-paper">
            <span className="eyebrow">{pick(itinerary.fee.label)}</span>
            <div className="stat-value mt-2 num" style={{ fontSize: '2.2rem' }}>
              {itinerary.fee.amount != null ? formatRM(itinerary.fee.amount) : t('itinerary.tbc')}
            </div>
            <p className="small muted mt-1">{t('itinerary.perVolunteer')}</p>
            <ul className="checklist mt-3">
              {itinerary.fee.covers.map((c, i) => (
                <li key={i}>{pick(c)}</li>
              ))}
            </ul>
            {itinerary.fee.note && <p className="small muted mt-3">{pick(itinerary.fee.note)}</p>}
          </div>
        )}
        {itinerary.bring && (
          <div>
            <span className="eyebrow">{t('itinerary.whatToBring')}</span>
            <ul className="checklist mt-3">
              {itinerary.bring.map((item, i) => (
                <li key={i}>{pick(item)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
