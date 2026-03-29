const KEY = 'mitgaisimhub-role-quiz-v1'

/** @returns {{ category: string, scores: Record<string, number>, completedAt: string } | null} */
export function loadQuizResult() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object') return null
    const category = typeof data.category === 'string' ? data.category : ''
    const completedAt =
      typeof data.completedAt === 'string' ? data.completedAt : ''
    const scores = data.scores && typeof data.scores === 'object' ? data.scores : null
    if (!category || !scores) return null
    return { category, scores, completedAt }
  } catch {
    return null
  }
}

/** @param {{ category: string, scores: Record<string, number> }} payload */
export function saveQuizResult({ category, scores }) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        category,
        scores,
        completedAt: new Date().toISOString(),
      }),
    )
  } catch {
    /* ignore */
  }
}

export function clearQuizResult() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
