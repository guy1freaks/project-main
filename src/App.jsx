import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { packingChecklist } from './data/packingChecklist'
import { idfRoles, parentAnchorId, subroleAnchorId } from './data/idfRoles'
import './App.css'

/** משך חובה כללי לחישוב משוער (שנים) */
const SERVICE_YEARS = { male: 2.8, female: 2 }

function computeApproxEndDate(isoDateStr, years) {
  if (!isoDateStr) return null
  const start = new Date(`${isoDateStr}T12:00:00`)
  if (Number.isNaN(start.getTime())) return null
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000
  return new Date(start.getTime() + years * msPerYear)
}

function formatHebrewDate(d) {
  return d.toLocaleDateString('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function App() {
  const [draftDate, setDraftDate] = useState('')
  const [gender, setGender] = useState('male')
  const [navOpen, setNavOpen] = useState(false)
  const burgerRef = useRef(null)
  const mobileCloseRef = useRef(null)

  const closeNav = useCallback(() => {
    setNavOpen(false)
    setTimeout(() => burgerRef.current?.focus(), 0)
  }, [])

  const toggleNav = useCallback(() => {
    setNavOpen((o) => !o)
  }, [])

  useEffect(() => {
    if (!navOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeNav()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [navOpen, closeNav])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const onChange = () => {
      if (mq.matches) setNavOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!navOpen) return
    const id = requestAnimationFrame(() => mobileCloseRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [navOpen])

  const approxEndDate = useMemo(
    () => computeApproxEndDate(draftDate, SERVICE_YEARS[gender]),
    [draftDate, gender],
  )

  return (
    <div className="app">
      <header className="site-header">
        <div className="site-header-inner">
          <button
            ref={burgerRef}
            type="button"
            className={`nav-burger ${navOpen ? 'is-open' : ''}`}
            aria-expanded={navOpen}
            aria-controls="site-nav"
            aria-label={navOpen ? 'סגירת תפריט ניווט' : 'פתיחת תפריט ניווט'}
            onClick={toggleNav}
          >
            <span className="nav-burger-icon" aria-hidden>
              <span className="nav-burger-line" />
              <span className="nav-burger-line" />
              <span className="nav-burger-line" />
            </span>
          </button>
          <a className="brand" href="#home" onClick={closeNav}>
            MitgaisimCheck
          </a>
          <div
            className={`nav-backdrop ${navOpen ? 'is-open' : ''}`}
            onClick={closeNav}
            aria-hidden
          />
          <nav
            id="site-nav"
            className={`nav-primary ${navOpen ? 'is-open' : ''}`}
            aria-label="ניווט ראשי"
          >
            <div className="nav-mobile-header">
              <span className="nav-mobile-title">ניווט</span>
              <button
                ref={mobileCloseRef}
                type="button"
                className="nav-mobile-close"
                aria-label="סגירת תפריט"
                onClick={closeNav}
              >
                <span className="nav-mobile-close-icon" aria-hidden />
              </button>
            </div>
            <a className="nav-home" href="#home" onClick={closeNav}>
              מה להביא
            </a>
            <a className="nav-home" href="#roles" onClick={closeNav}>
              תפקידים בצה״ל
            </a>
            {idfRoles.map((parent) => (
              <a
                key={parent.id}
                className="nav-parent-link"
                href={`#${parentAnchorId(parent.id)}`}
                onClick={closeNav}
              >
                {parent.nameHe}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="main">
        <section id="home" className="section">
          <p className="section-kicker">לפני תאריך הגיוס</p>
          <h1 className="section-title">מה להביא איתך</h1>
          <p className="lead">
            רשימה כללית לנוחותך. הוראות סופיות תמיד לפי מכתב הגיוס ולשכת
            הגיוס — כדאי לוודא איתם לפני היום עצמו.
          </p>

          <div className="checklist-card">
            <div className="draft-calculator">
              <p className="draft-calculator-title">
                תאריך גיוס וחישוב שחרור משוער (כללי)
              </p>
              <div className="checklist-field">
                <label htmlFor="draft-date">תאריך גיוס (אופציונלי)</label>
                <input
                  id="draft-date"
                  name="draft-date"
                  type="date"
                  value={draftDate}
                  onChange={(e) => setDraftDate(e.target.value)}
                />
              </div>
              <p className="draft-calculator-subtitle">מגדר — משך שירות בחישוב הכללי</p>
              <div className="draft-gender-row" role="radiogroup" aria-label="מגדר לחישוב">
                <label className="draft-gender-option">
                  <input
                    type="radio"
                    name="service-gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                  />
                  גברים — 2.8 שנים
                </label>
                <label className="draft-gender-option">
                  <input
                    type="radio"
                    name="service-gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                  />
                  נשים — 2 שנים
                </label>
              </div>
              {draftDate && approxEndDate ? (
                <p className="draft-result">
                  תאריך סיום שירות משוער:{' '}
                  <time dateTime={approxEndDate.toISOString()}>
                    {formatHebrewDate(approxEndDate)}
                  </time>
                </p>
              ) : (
                <p className="draft-result draft-result-placeholder">
                  בחרו תאריך גיוס כדי לראות תאריך סיום משוער.
                </p>
              )}
              <p className="draft-calculator-note">
                זהו חישוב כללי בלבד: משך החובה בפועל תלוי בחיל, בתפקיד, בפרטים
                אישיים ובעדכוני חוק. יש לוודא מול צה״ל ומול מסמכים רשמיים.
              </p>
            </div>
            <div className="checklist-groups">
              {packingChecklist.map((role) => (
                <div key={role.id} className="checklist-role-block">
                  <h3 className="checklist-role-title">{role.title}</h3>
                  {role.sections.map((sec, si) => (
                    <div key={`${role.id}-sec-${si}`} className="checklist-sub-block">
                      {sec.heading ? (
                        <h4 className="checklist-subheading">{sec.heading}</h4>
                      ) : null}
                      <ul className="checklist-list">
                        {sec.items.map((text, ii) => {
                          const cid = `chk-${role.id}-${si}-${ii}`
                          return (
                            <li key={cid} className="checklist-item">
                              <input
                                type="checkbox"
                                id={cid}
                                name={cid}
                              />
                              <label
                                className="checklist-text"
                                htmlFor={cid}
                              >
                                {text}
                              </label>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="disclaimer">
              האתר אינו ממסר רשמי של צה״ל. ייתכנו שינויים לפי יחידה ותאריך —
              בדוק מול הלשכה ומכתב הגיוס שלך.
            </p>
          </div>
        </section>

        <section id="roles" className="section">
          <p className="section-kicker">מבנה כללי</p>
          <h2 className="section-title">תפקידים בצה״ל</h2>
          <p className="lead">
            לכל ענף יש תפקידי בסיס ותפקידים ממוקדים בתוך היחידה. להלן תיאור
            קצר — לא מחליף הסבר בבסיס או בלשכה.
          </p>

          {idfRoles.map((parent) => (
            <article
              key={parent.id}
              id={parentAnchorId(parent.id)}
              className="roles-parent section"
            >
              <h3 className="roles-parent-title">{parent.nameHe}</h3>
              <p className="roles-parent-summary">{parent.summary}</p>
              {parent.subroles.map((sub) => (
                <div
                  key={sub.id}
                  id={subroleAnchorId(parent.id, sub.id)}
                  className="subrole-block section"
                >
                  <p className="subrole-name">{sub.nameHe}</p>
                  <p className="subrole-desc">{sub.whatTheyDo}</p>
                </div>
              ))}
            </article>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <p>MitgaisimCheck — מידע כללי למתגייסים</p>
        <p className="site-footer-credit">פיתוח: Guy Amayoff</p>
      </footer>
    </div>
  )
}

export default App
