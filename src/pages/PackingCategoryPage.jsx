import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { packingChecklist } from '../data/packingChecklist'
import NotFoundPage from './NotFoundPage'

function storageKeyForPack(categoryId) {
  return `mitgaisimhub-pack-${categoryId}`
}

function loadCheckedMap(categoryId) {
  try {
    const raw = localStorage.getItem(storageKeyForPack(categoryId))
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function persistMap(categoryId, next) {
  try {
    localStorage.setItem(storageKeyForPack(categoryId), JSON.stringify(next))
  } catch {
    /* private mode / quota */
  }
}

function PackingCategoryBody({ role }) {
  const [checkedMap, setCheckedMap] = useState(() => loadCheckedMap(role.id))

  const toggleItem = useCallback(
    (itemId) => {
      setCheckedMap((prev) => {
        const next = { ...prev, [itemId]: !prev[itemId] }
        persistMap(role.id, next)
        return next
      })
    },
    [role.id],
  )

  return (
    <>
      <section className="section">
        <p className="section-kicker">
          <Link className="category-back-link" to="/checklist">
            צ׳קליסט למתגייס
          </Link>
          {' · '}
          <span className="category-back-current">{role.title}</span>
        </p>
        <h1 className="section-title">{role.title}</h1>
        <p className="lead">
          רשימה כללית לנוחותך. הוראות סופיות תמיד לפי מכתב הגיוס ולשכת הגיוס.
        </p>
        <p className="pack-persist-hint" role="status">
          סימוני הרשימה נשמרים במכשיר זה (בדפדפן).
        </p>

        <div className="checklist-card">
          <div className="checklist-groups">
            <div className="checklist-role-block">
              {role.sections.map((sec, si) => (
                <div key={`${role.id}-sec-${si}`} className="checklist-sub-block">
                  {sec.heading ? (
                    <h2 className="checklist-subheading">{sec.heading}</h2>
                  ) : null}
                  <ul className="checklist-list">
                    {sec.items.map((text, ii) => {
                      const cid = `chk-${role.id}-${si}-${ii}`
                      return (
                        <li key={cid} className="checklist-item">
                          <input
                            type="checkbox"
                            id={cid}
                            checked={!!checkedMap[cid]}
                            onChange={() => toggleItem(cid)}
                          />
                          <label className="checklist-text" htmlFor={cid}>
                            {text}
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="category-page-nav">
          <Link className="category-nav-more" to="/checklist">
            כל קטגוריות הציוד
          </Link>
        </p>
      </section>
    </>
  )
}

function PackingCategoryPage() {
  const { categoryId } = useParams()
  const role = packingChecklist.find((r) => r.id === categoryId)

  if (!role) {
    return <NotFoundPage />
  }

  return <PackingCategoryBody key={role.id} role={role} />
}

export default PackingCategoryPage
