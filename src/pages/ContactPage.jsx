import { CONTACT_EMAIL, SITE_NAME } from '../siteMeta'

function ContactPage() {
  const mailto = CONTACT_EMAIL
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`פנייה מהאתר ${SITE_NAME}`)}`
    : null

  return (
    <section className="section page-static" id="contact">
      <p className="section-kicker">דברו איתנו</p>
      <h1 className="section-title">צור קשר</h1>
      <div className="static-prose">
        <p>
          לשאלות, הערות על התוכן או דיווח על תקלה באתר ניתן לפנות בדוא״ל כשפרטי
          יצירת הקשר זמינים.
        </p>
        {mailto ? (
          <p>
            <a className="contact-email-link" href={mailto}>
              {CONTACT_EMAIL}
            </a>
          </p>
        ) : (
          <p className="contact-placeholder">
            פרטי יצירת קשר בדוא״ל יתעדכנו כאן בהמשך.
          </p>
        )}
      </div>
    </section>
  )
}

export default ContactPage
