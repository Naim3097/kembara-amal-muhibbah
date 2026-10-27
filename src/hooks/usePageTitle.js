import { useEffect } from 'react'

const BASE = 'Kembara Amal Muhibbah (KAMI)'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : BASE
    return () => {
      document.title = BASE
    }
  }, [title])
}
