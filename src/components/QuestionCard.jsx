function QuestionCard({
  stepIndex,
  totalSteps,
  prompt,
  answers,
  onPick,
  onBack,
  animKey,
}) {
  const pct = totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0

  return (
    <div
      className="quiz-question-wrap"
      key={animKey}
      role="group"
      aria-labelledby="quiz-question-title"
    >
      <div
        className="quiz-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-labelledby="quiz-progress-status"
      >
        <div className="quiz-progress-track">
          <div
            className="quiz-progress-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <p className="quiz-progress-label" id="quiz-progress-status">
        שאלה {stepIndex + 1} מתוך {totalSteps}
      </p>

      <h2 className="quiz-question-title" id="quiz-question-title">
        {prompt}
      </h2>

      <ul className="quiz-answers" aria-label="אפשרויות תשובה">
        {answers.map((a, i) => (
          <li key={a.label}>
            <button
              type="button"
              className="quiz-answer-btn"
              onClick={() => onPick(i)}
            >
              <span className="quiz-answer-text">{a.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {onBack ? (
        <div className="quiz-back-row">
          <button type="button" className="quiz-back-btn" onClick={onBack}>
            חזרה לשאלה קודמת
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default QuestionCard
