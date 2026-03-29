import { useEffect, useMemo, useState } from 'react'
import { loadPazamPrefs, savePazamPrefs } from '../lib/pazamStorage'

const SERVICE_YEARS = { male: 2.8, female: 2 }

function computeApproxEndDate(isoDateStr, years) {
  if (!isoDateStr) return null
  const start = new Date(`${isoDateStr}T12:00:00`)
  if (Number.isNaN(start.getTime())) return null
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000
  return new Date(start.getTime() + years * msPerYear)
}

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function formatHebrewDate(d) {
  return d.toLocaleDateString('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function daysBetweenInclusiveFuture(fromDay, toDay) {
  const ms = 24 * 60 * 60 * 1000
  return Math.ceil((toDay - fromDay) / ms)
}

function PazamPage() {
  const [prefs, setPrefs] = useState(() => loadPazamPrefs())

  useEffect(() => {
    savePazamPrefs(prefs)
  }, [prefs])

  const { draftDate, gender } = prefs

  const approxEndDate = useMemo(
    () => computeApproxEndDate(draftDate, SERVICE_YEARS[gender]),
    [draftDate, gender],
  )

  const timeline = useMemo(() => {
    if (!draftDate || !approxEndDate) return null
    const today = startOfDay(new Date())
    const draftDay = startOfDay(new Date(`${draftDate}T12:00:00`))
    const endDay = startOfDay(approxEndDate)

    if (today < draftDay) {
      const days = daysBetweenInclusiveFuture(today, draftDay)
      return { kind: 'preDraft', days, label: 'ימים עד תאריך הגיוס (לפי הבחירה)' }
    }
    if (today >= draftDay && today <= endDay) {
      const days = daysBetweenInclusiveFuture(today, endDay)
      return {
        kind: 'inService',
        days,
        label: 'ימים עד שחרור משוער (לפי חישוב כללי)',
      }
    }
    return { kind: 'after', label: null }
  }, [draftDate, approxEndDate])

  return (
    <>
      <section className="section" id="pazam">
        <p className="section-kicker">חישוב כללי</p>
        <h1 className="section-title">פז״מ — תאריך גיוס ושחרור משוער</h1>
        <p className="lead">
          הזינו תאריך גיוס ומגדר לחישוב משך חובה כללי. הנתונים נשמרים בדפדפן שלך
          (מקומית) כדי שלא תצטרכו להקליד מחדש בביקור הבא — לא נשלחים לשרת.
        </p>

        <div className="checklist-card">
          <div className="draft-calculator">
            <p className="draft-calculator-title">
              תאריך גיוס וחישוב שחרור משוער (כללי)
            </p>
            <div className="checklist-field">
              <label htmlFor="draft-date">תאריך גיוס</label>
              <input
                id="draft-date"
                name="draft-date"
                type="date"
                value={draftDate}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, draftDate: e.target.value }))
                }
                autoComplete="off"
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
                  onChange={() => setPrefs((p) => ({ ...p, gender: 'male' }))}
                />
                גברים — 2.8 שנים
              </label>
              <label className="draft-gender-option">
                <input
                  type="radio"
                  name="service-gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setPrefs((p) => ({ ...p, gender: 'female' }))}
                />
                נשים — 2 שנים
              </label>
            </div>
            {draftDate && approxEndDate ? (
              <>
                <p className="draft-result">
                  תאריך סיום שירות משוער:{' '}
                  <time dateTime={approxEndDate.toISOString()}>
                    {formatHebrewDate(approxEndDate)}
                  </time>
                </p>
                {timeline && timeline.kind === 'preDraft' ? (
                  <p className="draft-result draft-result-highlight">
                    {timeline.label}: <strong>{timeline.days}</strong>
                  </p>
                ) : null}
                {timeline && timeline.kind === 'inService' ? (
                  <p className="draft-result draft-result-highlight">
                    {timeline.label}: <strong>{timeline.days}</strong>
                  </p>
                ) : null}
                {timeline && timeline.kind === 'after' ? (
                  <p className="draft-result draft-result-muted">
                    לפי החישוב הכללי והתאריכים שהוזנו, תקופת החובה המשוערת הסתיימה.
                    יש לוודא מול צה״ל ומול מסמכים רשמיים.
                  </p>
                ) : null}
              </>
            ) : (
              <p className="draft-result draft-result-placeholder">
                בחרו תאריך גיוס כדי לראות תאריך סיום משוער וסטטוס יחסי להיום.
              </p>
            )}
            <p className="draft-calculator-note">
              זהו חישוב כללי בלבד: משך החובה בפועל תלוי בחיל, בתפקיד, בפרטים אישיים
              ובעדכוני חוק. יש לוודא מול צה״ל ומול מסמכים רשמיים.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default PazamPage
