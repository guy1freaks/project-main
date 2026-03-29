import { Link } from 'react-router-dom'
import { idfRoles, subroleAnchorId } from '../data/idfRoles'
import {
  categoryResultCopy,
  categoryRoleExamples,
} from '../data/roleQuiz'

function ResultCard({ categoryId, scores, onRetake }) {
  const copy = categoryResultCopy[categoryId]
  const examples = categoryRoleExamples[categoryId] ?? []

  const resolved = examples
    .map(({ parentId, subId }) => {
      const parent = idfRoles.find((p) => p.id === parentId)
      if (!parent) return null
      const sub = parent.subroles.find((s) => s.id === subId)
      if (!sub) return null
      const hash = subroleAnchorId(parentId, subId)
      return {
        key: `${parentId}-${subId}`,
        title: `${sub.nameHe} · ${parent.nameHe}`,
        to: `/roles/${parentId}#${hash}`,
        blurb: sub.whatTheyDo,
      }
    })
    .filter(Boolean)

  return (
    <div className="quiz-result-card" role="region" aria-live="polite">
      <p className="section-kicker">תוצאה</p>
      <h2 className="quiz-result-headline">{copy.headline}</h2>
      <p className="quiz-result-expl">{copy.explanation}</p>

      {scores ? (
        <p className="quiz-result-scores" aria-label="פירוט ניקוד">
          <span className="quiz-result-scores-label">פירוט ניקוד כללי:</span>{' '}
          לחימה {scores.combat ?? 0} · טכנולוגיה {scores.tech ?? 0} · מודיעין{' '}
          {scores.intelligence ?? 0} · לוגיסטיקה {scores.logistics ?? 0}
        </p>
      ) : null}

      <h3 className="quiz-result-subtitle">דוגמאות לתפקידים באתר</h3>
      <ul className="quiz-result-roles">
        {resolved.map((r) => (
          <li key={r.key}>
            <Link className="quiz-result-role-link" to={r.to}>
              {r.title}
            </Link>
            <p className="quiz-result-role-desc">{r.blurb}</p>
          </li>
        ))}
      </ul>

      <p className="quiz-result-disclaimer">
        התוצאה היא{' '}
        <strong>המלצה כללית בלבד</strong> — אינה מגיוס רשמי ואינה מבטיחה שיבוץ.
        לפני החלטות יש לוודא מול לשכת הגיוס ומול מסמכים רשמיים.
      </p>

      <div className="quiz-result-actions">
        <button type="button" className="quiz-primary-btn" onClick={onRetake}>
          בחן את עצמך שוב
        </button>
        <Link className="quiz-secondary-link" to="/">
          חזרה לעמוד התפקידים
        </Link>
      </div>
    </div>
  )
}

export default ResultCard
