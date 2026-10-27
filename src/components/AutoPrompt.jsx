import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useDonation } from '../context/DonationContext'

const EXCLUDED = ['/checkout', '/donate']
const KEY = 'kami.prompted'
const DELAY_MS = 20000
const SCROLL_RATIO = 0.55

/**
 * Opens the donation pop-up once per browser session, after the visitor has
 * either spent 20 seconds on a page or scrolled past roughly half of it.
 * Never fires on the donation or checkout pages, and never twice.
 */
export default function AutoPrompt() {
  const { openDonation, modal } = useDonation()
  const { pathname } = useLocation()
  const modalOpen = useRef(modal.open)
  modalOpen.current = modal.open

  useEffect(() => {
    if (EXCLUDED.some((p) => pathname.startsWith(p))) return undefined
    try {
      if (sessionStorage.getItem(KEY)) return undefined
    } catch {
      /* ignore */
    }

    let done = false
    const fire = () => {
      if (done || modalOpen.current) return
      done = true
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* ignore */
      }
      openDonation({ auto: true })
    }
    const onScroll = () => {
      const doc = document.documentElement
      const seen = (window.scrollY + window.innerHeight) / doc.scrollHeight
      if (seen >= SCROLL_RATIO) fire()
    }
    const timer = setTimeout(fire, DELAY_MS)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname, openDonation])

  return null
}
