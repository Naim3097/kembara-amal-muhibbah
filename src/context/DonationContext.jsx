import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const DonationContext = createContext(null)
const PENDING_KEY = 'kami.pendingDonation'

const readPending = () => {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function DonationProvider({ children }) {
  const [modal, setModal] = useState({ open: false, campaign: null, auto: false })
  const [pending, setPendingState] = useState(readPending)

  const setPending = useCallback((value) => {
    setPendingState(value)
    try {
      if (value) sessionStorage.setItem(PENDING_KEY, JSON.stringify(value))
      else sessionStorage.removeItem(PENDING_KEY)
    } catch {
      /* storage unavailable; state still works for this page */
    }
  }, [])

  const openDonation = useCallback((opts = {}) => {
    setModal({ open: true, campaign: opts.campaign || null, auto: !!opts.auto })
  }, [])

  const closeDonation = useCallback(() => {
    setModal((m) => ({ ...m, open: false }))
  }, [])

  useEffect(() => {
    document.body.classList.toggle('modal-open', modal.open)
    return () => document.body.classList.remove('modal-open')
  }, [modal.open])

  const value = useMemo(
    () => ({ modal, openDonation, closeDonation, pending, setPending }),
    [modal, openDonation, closeDonation, pending, setPending],
  )

  return <DonationContext.Provider value={value}>{children}</DonationContext.Provider>
}

export const useDonation = () => {
  const ctx = useContext(DonationContext)
  if (!ctx) throw new Error('useDonation must be used inside DonationProvider')
  return ctx
}
