import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './en'
import ms from './ms'

const DICT = { en, ms }
const KEY = 'kami.lang'
const LanguageContext = createContext(null)

const detect = () => {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'ms') return saved
  } catch {
    /* ignore */
  }
  const nav = (typeof navigator !== 'undefined' && navigator.language) || ''
  return nav.toLowerCase().startsWith('ms') ? 'ms' : 'en'
}

const lookup = (dict, path) => path.split('.').reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), dict)

const interpolate = (str, vars) =>
  vars ? str.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? String(vars[k]) : m)) : str

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detect)

  useEffect(() => {
    document.documentElement.lang = lang === 'ms' ? 'ms' : 'en'
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const setLang = useCallback((next) => setLangState(next === 'ms' ? 'ms' : 'en'), [])
  const toggle = useCallback(() => setLangState((l) => (l === 'ms' ? 'en' : 'ms')), [])

  /** Translate a UI string by dotted key. Falls back to English, then to the key. */
  const t = useCallback(
    (key, vars) => {
      let v = lookup(DICT[lang], key)
      if (v === undefined) v = lookup(DICT.en, key)
      if (v === undefined) return key
      return typeof v === 'string' ? interpolate(v, vars) : v
    },
    [lang],
  )

  /** Pick the current language from a bilingual { en, ms } value; passes plain values through. */
  const pick = useCallback(
    (value) => {
      if (value && typeof value === 'object' && !Array.isArray(value) && ('en' in value || 'ms' in value)) {
        return value[lang] ?? value.en ?? value.ms ?? ''
      }
      return value
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, toggle, t, pick }), [lang, setLang, toggle, t, pick])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLang = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
