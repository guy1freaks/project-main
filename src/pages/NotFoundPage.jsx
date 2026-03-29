import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="section not-found-page" aria-labelledby="not-found-title">
      <p className="section-kicker">שגיאה</p>
      <h1 id="not-found-title" className="section-title">
        הדף לא נמצא
      </h1>
      <p className="not-found-code" aria-hidden>
        404
      </p>
      <p className="lead">
        כתובת זו אינה קיימת באתר, או שהקישור שגוי.
      </p>
      <p className="not-found-actions">
        <Link className="not-found-home" to="/">
          חזרה לדף הבית
        </Link>
      </p>
    </section>
  )
}
