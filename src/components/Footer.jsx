import { Link } from 'react-router-dom'
import { org } from '../data/organisation'
import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
  const { t, lang } = useLang()
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src="/images/logo-kami-160.png" alt="" width="52" height="52" />
              <div>
                <div className="brand-name">{org.name}</div>
                <div className="brand-sub">{org.legalName}</div>
              </div>
            </div>
            {lang === 'ms' ? (
              <p className="footer-note serif italic">{org.mission}</p>
            ) : (
              <>
                <p className="footer-note">{org.missionEn}</p>
                <p className="footer-note mt-2 serif italic">{org.mission}</p>
              </>
            )}
          </div>

          <div>
            <h4>{t('footer.explore')}</h4>
            <ul>
              <li><Link to="/programs">{t('nav.programs')}</Link></li>
              <li><Link to="/itineraries">{t('nav.itineraries')}</Link></li>
              <li><Link to="/events">{t('nav.events')}</Link></li>
              <li><Link to="/gallery">{t('nav.gallery')}</Link></li>
              <li><Link to="/about">{t('footer.aboutKami')}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t('footer.getInvolved')}</h4>
            <ul>
              <li><Link to="/donate">{t('nav.donate')}</Link></li>
              <li><Link to="/campaigns/sedekah-jumaat">{t('footer.sedekah')}</Link></li>
              <li><Link to="/volunteer">{t('nav.volunteer')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
              <li><a href={org.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </div>

          <div>
            <h4>{t('footer.bank')}</h4>
            <div className="footer-bank">
              <span><strong>{org.bank.name}</strong> {org.bank.accountNoSpaced}</span>
              <span>{org.bank.accountName}</span>
              <span className="mt-1">
                <a href={`mailto:${org.email}`}>{org.email}</a>
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t('footer.copyright', { year, name: org.legalName, motto: org.motto })}</span>
          <nav aria-label={t('footer.legal')}>
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <Link to="/terms">{t('footer.terms')}</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
