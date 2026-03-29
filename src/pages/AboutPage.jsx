import { SITE_NAME } from '../siteMeta'

function AboutPage() {
  return (
    <section className="section page-static" id="about">
      <p className="section-kicker">מי אנחנו</p>
      <h1 className="section-title">אודות {SITE_NAME}</h1>
      <div className="static-prose">
        <p>
          {SITE_NAME} הוא פרויקט אישי שמטרתו לארגן מידע כללי שימושי למתגייסים ולמי
          שמתעניין במבנה תפקידים בצה״ל ובציוד בסיסי לקראת גיוס — בצורה קריאה, מהירה
          ונוחה לנייד.
        </p>
        <p>
          האתר נועד לארגן מידע בצורה נגישה וברורה, בלי להתיימר לייצג את צה״ל או
          להחליף הוראות מגויס רשמיות.
        </p>
        <p>
          כל התוכן כאן הוא{' '}
          <strong>הסברי וכללי</strong>. לפני גיוס או רכישת ציוד יש להסתמך על מכתב
          הגיוס, על הלשכה ועל הנחיות היחידה.
        </p>
        <p className="about-credits">
          תמונות הגלריה בדף הבית מ־{' '}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
          {' '}
          — שימוש לפי{' '}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
          >
            רישיון Unsplash
          </a>
          .
        </p>
        <p className="static-prose-signoff">פיתוח ותוכן: Guy Amayoff</p>
      </div>
    </section>
  )
}

export default AboutPage
