import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { idfRoles, parentAnchorId, subroleAnchorId } from '../data/idfRoles'
import NotFoundPage from './NotFoundPage'

function RoleUnitPage() {
  const { unitId } = useParams()
  const location = useLocation()
  const parent = idfRoles.find((p) => p.id === unitId)

  useEffect(() => {
    const raw = location.hash.replace(/^#/, '')
    if (!raw) return
    const el = document.getElementById(raw)
    if (!el) return
    const id = requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(id)
  }, [location.pathname, location.hash, unitId])

  if (!parent) {
    return <NotFoundPage />
  }

  return (
    <section className="section">
      <p className="section-kicker">
        <Link className="category-back-link" to="/">
          תפקידים בצה״ל
        </Link>
        {' · '}
        <span className="category-back-current">{parent.nameHe}</span>
      </p>
      <h1 className="section-title">{parent.nameHe}</h1>
      <p className="lead roles-parent-summary">{parent.summary}</p>

      <nav className="subrole-toc" aria-label="קפיצה לתת־תפקידים">
        <p className="subrole-toc-label">במקטע זה</p>
        <ul className="subrole-toc-list">
          {parent.subroles.map((sub) => (
            <li key={sub.id}>
              <a
                className="subrole-toc-link"
                href={`#${subroleAnchorId(parent.id, sub.id)}`}
              >
                {sub.nameHe}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <article
        id={parentAnchorId(parent.id)}
        className="roles-parent section roles-parent--active"
      >
        {parent.subroles.map((sub) => (
          <section
            key={sub.id}
            id={subroleAnchorId(parent.id, sub.id)}
            className="subrole-block section"
            aria-labelledby={`subrole-h-${parent.id}-${sub.id}`}
          >
            <h2
              className="subrole-name"
              id={`subrole-h-${parent.id}-${sub.id}`}
            >
              {sub.nameHe}
            </h2>
            <p className="subrole-desc">{sub.whatTheyDo}</p>
          </section>
        ))}
      </article>

      <p className="category-page-nav">
        <Link className="category-nav-more" to="/">
          כל הענפים
        </Link>
      </p>
    </section>
  )
}

export default RoleUnitPage
