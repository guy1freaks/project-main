import { Link } from 'react-router-dom'
import { packingChecklist } from '../data/packingChecklist'

function ChecklistPage() {
  return (
    <section id="checklist" className="section">
      <p className="section-kicker">לפני תאריך הגיוס</p>
      <h1 className="section-title">צ׳קליסט למתגייס</h1>
      <p className="lead">
        רשימה כללית לנוחותך. הוראות סופיות תמיד לפי מכתב הגיוס ולשכת הגיוס —
        כדאי לוודא איתם לפני היום עצמו.
      </p>

      <div className="checklist-card">
        <h2 className="pack-categories-heading">קטגוריות ציוד</h2>
        <p className="pack-categories-intro">
          בחרו קטגוריה כדי לפתוח רשימה מלאה לפי סוג שירות.
        </p>
        <ul className="pack-category-grid" aria-label="קטגוריות ציוד">
          {packingChecklist.map((role) => (
            <li key={role.id}>
              <Link className="pack-category-tile" to={`/pack/${role.id}`}>
                <span className="pack-category-tile-title">{role.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ChecklistPage
