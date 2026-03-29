import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useMatch } from 'react-router-dom'
import { idfRoles } from '../data/idfRoles'
import { packingChecklist } from '../data/packingChecklist'
import { LOGO_SRC, SITE_NAME, SITE_TAGLINE } from '../siteMeta'
import '../App.css'

function Layout() {
  const location = useLocation()
  const unitRouteMatch = useMatch({ path: '/roles/:unitId', end: true })
  const routeUnitId = unitRouteMatch?.params?.unitId
  const isKnownUnit =
    routeUnitId != null && idfRoles.some((p) => p.id === routeUnitId)

  const [navOpen, setNavOpen] = useState(false)
  const [previewUnitId, setPreviewUnitId] = useState(null)
  const burgerRef = useRef(null)
  const mobileCloseRef = useRef(null)

  const path = location.pathname

  const homeNavActive = path === '/' || path.startsWith('/roles/')

  const checklistNavActive =
    path === '/checklist' || path.startsWith('/pack/')

  /** תפריט ענפים בניווט — רק בדף הבית (בית) */
  const showBranchesNav = path === '/' || path === ''

  /** בבית: צבע נושא לפי מעבר על ענף. בדפים אחרים: רק לפי דף היחידה */
  const effectiveUnitId = useMemo(() => {
    const onHome = path === '/' || path === ''
    if (!onHome) {
      return isKnownUnit ? routeUnitId : null
    }
    return previewUnitId ?? null
  }, [path, previewUnitId, isKnownUnit, routeUnitId])

  const unitThemeStyle = useMemo(() => {
    if (!effectiveUnitId) return undefined
    const unit = idfRoles.find((p) => p.id === effectiveUnitId)
    const t = unit?.theme
    if (!t) return undefined
    return {
      '--accent': t.accent,
      '--accent-soft': t.accentSoft,
      '--accent-hover': t.accentHover,
      '--border': t.border,
      '--surface': t.surface,
      '--shadow': t.shadow,
    }
  }, [effectiveUnitId])

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

  useEffect(() => {
    if (path === '/' || path === '') {
      document.title = `תפקידים בצה״ל | ${SITE_TAGLINE}`
      return
    }
    if (path === '/checklist') {
      document.title = `צ׳קליסט למתגייס | ${SITE_TAGLINE}`
      return
    }
    if (path === '/pazam') {
      document.title = `פז״מ | ${SITE_TAGLINE}`
      return
    }
    if (path === '/about') {
      document.title = `אודות | ${SITE_TAGLINE}`
      return
    }
    if (path === '/contact') {
      document.title = `צור קשר | ${SITE_TAGLINE}`
      return
    }
    if (path === '/quiz') {
      document.title = `בחן את עצמך | ${SITE_TAGLINE}`
      return
    }
    const unitMatch = path.match(/^\/roles\/([^/]+)$/)
    if (unitMatch) {
      const unit = idfRoles.find((p) => p.id === unitMatch[1])
      document.title = unit
        ? `${unit.nameHe} | ${SITE_TAGLINE}`
        : `דף לא נמצא | ${SITE_TAGLINE}`
      return
    }
    const packMatch = path.match(/^\/pack\/([^/]+)$/)
    if (packMatch) {
      const cat = packingChecklist.find((c) => c.id === packMatch[1])
      document.title = cat
        ? `${cat.title} | ${SITE_TAGLINE}`
        : `דף לא נמצא | ${SITE_TAGLINE}`
      return
    }
    document.title = `דף לא נמצא | ${SITE_TAGLINE}`
  }, [path])

  const navLinkClass = ({ isActive }) =>
    `nav-home${isActive ? ' active' : ''}`

  return (
    <div
      className={`app${unitThemeStyle ? ' app--unit-theme' : ''}`}
      style={unitThemeStyle}
    >
      <a
        className="skip-link"
        href="#main-content"
        onClick={() => {
          requestAnimationFrame(() => {
            document.getElementById('main-content')?.focus({ preventScroll: true })
          })
        }}
      >
        דלג לתוכן הראשי
      </a>
      <header className="site-header">
        <div className="site-header-inner">
          <div className="site-header-tools">
            <Link className="brand" to="/" onClick={closeNav}>
              <img
                className="brand-logo"
                src={LOGO_SRC}
                alt=""
                width={72}
                height={72}
                decoding="async"
              />
              <span className="brand-text">
                <span className="brand-name">{SITE_NAME}</span>
                <span className="brand-tagline">{SITE_TAGLINE}</span>
              </span>
            </Link>
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
          </div>

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

            <div className="nav-main-links">
              <Link
                className={`nav-home${homeNavActive ? ' active' : ''}`}
                to="/"
                onClick={closeNav}
              >
                בית
              </Link>
              <Link
                className={`nav-home${checklistNavActive ? ' active' : ''}`}
                to="/checklist"
                onClick={closeNav}
              >
                צ׳קליסט למתגייס
              </Link>
              <NavLink
                className={navLinkClass}
                to="/pazam"
                onClick={closeNav}
              >
                פז״מ
              </NavLink>
              <NavLink className={navLinkClass} to="/quiz" onClick={closeNav}>
                בחן את עצמך
              </NavLink>
              <NavLink className={navLinkClass} to="/about" onClick={closeNav}>
                אודות
              </NavLink>
              <NavLink
                className={navLinkClass}
                to="/contact"
                onClick={closeNav}
              >
                צור קשר
              </NavLink>
            </div>

            {showBranchesNav ? (
              <div className="nav-branches-wrap" role="navigation" aria-label="ענפים">
                <p className="nav-branches-label">תפקידים לפי ענף</p>
                <div className="nav-branches">
                  {idfRoles.map((parent) => (
                    <Link
                      key={parent.id}
                      className={`nav-parent-link${
                        effectiveUnitId === parent.id
                          ? ' nav-parent-link--active'
                          : ''
                      }`}
                      to={`/roles/${parent.id}`}
                      onClick={closeNav}
                      onMouseEnter={() => setPreviewUnitId(parent.id)}
                      onMouseLeave={() => setPreviewUnitId(null)}
                      onFocus={() => setPreviewUnitId(parent.id)}
                      onBlur={() => setPreviewUnitId(null)}
                    >
                      <span className="nav-parent-emoji" aria-hidden>
                        {parent.emoji}
                      </span>
                      <span className="nav-parent-text">{parent.nameHe}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </nav>
        </div>
        <div
          className={`nav-backdrop ${navOpen ? 'is-open' : ''}`}
          onClick={closeNav}
          aria-hidden
        />
      </header>

      <main id="main-content" className="main" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <p className="site-footer-title">
            {SITE_NAME} — {SITE_TAGLINE}
          </p>
          <p className="site-footer-disclaimer">
            האתר אינו ממסד רשמי של צה״ל ואינו מחליף הוראות מגייס או מכתב גיוס. ייתכנו
            שינויים לפי יחידה ותאריך — יש לוודא מול הלשכה ומול המסמכים הרשמיים.
          </p>
          <p className="site-footer-credit">פיתוח: Guy Amayoff</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
