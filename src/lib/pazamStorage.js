const KEY = 'mitgaisimhub-pazam'
const COOKIE_NAME = 'mitgaisimhub_pazam'

/** Read saved פז״מ prefs from localStorage (primary) or cookie fallback. */
export function loadPazamPrefs() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const data = JSON.parse(raw)
      if (data && typeof data === 'object') {
        return {
          draftDate: typeof data.draftDate === 'string' ? data.draftDate : '',
          gender: data.gender === 'female' ? 'female' : 'male',
        }
      }
    }
  } catch {
    /* ignore */
  }
  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
    )
    if (match) {
      const decoded = decodeURIComponent(match[1])
      const data = JSON.parse(decoded)
      if (data && typeof data === 'object') {
        return {
          draftDate: typeof data.draftDate === 'string' ? data.draftDate : '',
          gender: data.gender === 'female' ? 'female' : 'male',
        }
      }
    }
  } catch {
    /* ignore */
  }
  return { draftDate: '', gender: 'male' }
}

/** Persist prefs to localStorage and a small SameSite cookie (mirror). */
export function savePazamPrefs({ draftDate, gender }) {
  const payload = JSON.stringify({
    draftDate: draftDate || '',
    gender: gender === 'female' ? 'female' : 'male',
  })
  try {
    localStorage.setItem(KEY, payload)
  } catch {
    /* quota / private mode */
  }
  try {
    const maxAge = 60 * 60 * 24 * 400
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(payload)};path=/;max-age=${maxAge};SameSite=Lax`
  } catch {
    /* cookies disabled */
  }
}
