import { Link } from 'react-router-dom'
import HomeHeroGallery from '../components/HomeHeroGallery'
import { idfRoles } from '../data/idfRoles'

function RolesIndexPage() {
  return (
    <>
      <HomeHeroGallery />

      <section id="roles" className="section">
        <p className="section-kicker">מבנה כללי</p>
        <h1 className="section-title">תפקידים בצה״ל</h1>
        <p className="lead">
          לכל ענף יש תפקידי בסיס ותפקידים ממוקדים בתוך היחידה. בחרו ענף כדי לקרוא
          סקירה קצרה. המידע כאן כללי בלבד — לפרטים שחלים עליכם אישית ולהנחיות רשמיות
          יש להסתמך על הצוות בבסיס ועל לשכת הגיוס.
        </p>

        <ul className="role-index-list" aria-label="ענפים">
          {idfRoles.map((parent) => (
            <li key={parent.id} className="role-index-item">
              <Link className="role-index-link" to={`/roles/${parent.id}`}>
                <span className="role-index-name">
                  <span className="role-index-emoji" aria-hidden>
                    {parent.emoji}
                  </span>
                  {parent.nameHe}
                </span>
                <span className="role-index-summary">{parent.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default RolesIndexPage
