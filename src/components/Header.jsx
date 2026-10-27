import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useDonation } from '../context/DonationContext'
import { useLang } from '../i18n/LanguageContext'

const links = [
  ['/programs', 'nav.programs'],
  ['/itineraries', 'nav.itineraries'],
  ['/events', 'nav.events'],
  ['/about', 'nav.about'],
  ['/volunteer', 'nav.volunteer'],
  ['/contact', 'nav.contact'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { openDonation } = useDonation()
  const { t, toggle } = useLang()
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const langButton = (
    <button type="button" className="lang-toggle" onClick={toggle} aria-label={t('lang.switchLabel')} title={t('lang.switchLabel')}>
      {t('lang.switchTo')}
    </button>
  )

  return (
    <header className="site-header">
      <div className="container bar">
        <Link to="/" className="brand" aria-label={t('nav.home')}>
          <img src="/images/logo-kami-160.png" alt="" width="46" height="46" />
          <span className="brand-text">
            <span className="brand-name">Kembara Amal Muhibbah</span>
            <span className="brand-sub">{t('nav.brandSub')}</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {links.map(([to, key]) => (
            <NavLink key={to} to={to}>
              {t(key)}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {langButton}
          <button type="button" className="btn btn-brand btn-sm" onClick={() => openDonation()}>
            {t('nav.donate')}
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="mobile-nav container" aria-label="Mobile">
          {links.map(([to, key]) => (
            <NavLink key={to} to={to}>
              {t(key)}
            </NavLink>
          ))}
          <Link to="/donate" className="btn btn-brand">
            {t('nav.donate')}
          </Link>
        </nav>
      )}
    </header>
  )
}
