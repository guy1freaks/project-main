import { useCallback, useMemo, useState } from 'react'
import QuestionCard from '../components/QuestionCard'
import ResultCard from '../components/ResultCard'
import {
  emptyScores,
  quizIntro,
  quizQuestions,
  winningCategory,
} from '../data/roleQuiz'
import {
  clearQuizResult,
  loadQuizResult,
  saveQuizResult,
} from '../lib/quizStorage'

function scoresFromAnswers(answerIndexes) {
  const s = emptyScores()
  answerIndexes.forEach((answerIdx, qIdx) => {
    const q = quizQuestions[qIdx]
    const ans = q?.answers?.[answerIdx]
    if (!ans?.points) return
    Object.entries(ans.points).forEach(([k, v]) => {
      if (typeof s[k] === 'number' && typeof v === 'number') {
        s[k] += v
      }
    })
  })
  return s
}

function QuizPage() {
  const [phase, setPhase] = useState('intro')
  const [answers, setAnswers] = useState([])
  const [resultCategory, setResultCategory] = useState(null)
  const [resultScores, setResultScores] = useState(null)
  const [savedHint, setSavedHint] = useState(() => loadQuizResult())

  const scoresLive = useMemo(() => scoresFromAnswers(answers), [answers])
  const total = quizQuestions.length

  const startQuiz = useCallback(() => {
    setPhase('quiz')
    setAnswers([])
    setResultCategory(null)
    setResultScores(null)
  }, [])

  const goToResult = useCallback((category, scores) => {
    setResultCategory(category)
    setResultScores(scores)
    setPhase('result')
  }, [])

  const finishWithScores = useCallback(
    (scores) => {
      const winner = winningCategory(scores)
      saveQuizResult({ category: winner, scores })
      setSavedHint(loadQuizResult())
      goToResult(winner, scores)
    },
    [goToResult],
  )

  const onPick = useCallback(
    (answerIndex) => {
      const next = [...answers, answerIndex]
      setAnswers(next)
      if (next.length >= total) {
        finishWithScores(scoresFromAnswers(next))
      }
    },
    [answers, total, finishWithScores],
  )

  const onBack = useCallback(() => {
    setAnswers((prev) => prev.slice(0, -1))
  }, [])

  const onRetake = useCallback(() => {
    clearQuizResult()
    setSavedHint(null)
    startQuiz()
  }, [startQuiz])

  const showSavedResult = useCallback(() => {
    const s = loadQuizResult()
    if (!s) return
    goToResult(s.category, s.scores)
  }, [goToResult])

  if (phase === 'result' && resultCategory) {
    return (
      <section className="section quiz-page" aria-labelledby="quiz-page-title">
        <p className="section-kicker">{quizIntro.title}</p>
        <h1 className="section-title visually-hidden" id="quiz-page-title">
          תוצאות — {quizIntro.title}
        </h1>
        <ResultCard
          categoryId={resultCategory}
          scores={resultScores}
          onRetake={onRetake}
        />
      </section>
    )
  }

  if (phase === 'intro') {
    return (
      <section className="section quiz-page" aria-labelledby="quiz-page-title">
        <p className="section-kicker">התאמה כללית</p>
        <h1 className="section-title" id="quiz-page-title">
          {quizIntro.title}
        </h1>
        <p className="lead quiz-intro-lead">{quizIntro.lead}</p>

        {savedHint ? (
          <div
            className="quiz-saved-banner"
            role="status"
            aria-label="תוצאה שמורה"
          >
            <p className="quiz-saved-text">
              יש תוצאה שמורה מהמבחן האחרון במכשיר זה.
            </p>
            <div className="quiz-saved-actions">
              <button
                type="button"
                className="quiz-outline-btn"
                onClick={showSavedResult}
              >
                הצג תוצאה אחרונה
              </button>
            </div>
          </div>
        ) : null}

        <div className="quiz-intro-card">
          <p className="quiz-intro-meta">
            כ־{total} שאלות · בחירה אחת בכל שלב · אפשר לחזור שלב אחורה
          </p>
          <button
            type="button"
            className="quiz-primary-btn quiz-intro-start"
            onClick={startQuiz}
          >
            התחל
          </button>
        </div>
      </section>
    )
  }

  const idx = answers.length
  const q = quizQuestions[idx]

  if (!q) {
    return null
  }

  return (
    <section className="section quiz-page" aria-labelledby="quiz-page-title">
      <p className="section-kicker">{quizIntro.title}</p>
      <h1 className="section-title visually-hidden" id="quiz-page-title">
        {quizIntro.title} — שאלה {idx + 1}
      </h1>

      <QuestionCard
        stepIndex={idx}
        totalSteps={total}
        prompt={q.prompt}
        answers={q.answers}
        onPick={onPick}
        onBack={idx > 0 ? onBack : null}
        animKey={`q-${q.id}-${idx}`}
      />

      <p className="quiz-live-scores visually-hidden" aria-live="polite">
        ניקוד נוכחי: לחימה {scoresLive.combat}, טכנולוגיה {scoresLive.tech},
        מודיעין {scoresLive.intelligence}, לוגיסטיקה {scoresLive.logistics}
      </p>
    </section>
  )
}

export default QuizPage
