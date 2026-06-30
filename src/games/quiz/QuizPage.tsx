import { useState, useEffect, useRef, useCallback } from 'react'
import PageHeader from '../../shared/components/PageHeader'
import GameResultModal from '../../shared/components/GameResultModal'
import { QUESTIONS } from '../../data/questions'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const TIME_PER_Q = 30

export default function QuizPage() {
  const [questions] = useState(() => shuffle(QUESTIONS).slice(0, 10))
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q)
  const [phase, setPhase] = useState<'question' | 'feedback' | 'done'>('question')
  const [showResult, setShowResult] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const advance = useCallback(() => {
    clearInterval(timerRef.current)
    const next = current + 1
    if (next >= questions.length) {
      setPhase('done')
      setTimeout(() => setShowResult(true), 400)
    } else {
      setCurrent(next)
      setSelected(null)
      setTimeLeft(TIME_PER_Q)
      setPhase('question')
    }
  }, [current, questions.length])

  useEffect(() => {
    if (phase !== 'question') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setPhase('feedback'); setTimeout(advance, 1200); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase, advance])

  function choose(idx: number) {
    if (phase !== 'question') return
    clearInterval(timerRef.current)
    setSelected(idx)
    if (idx === questions[current].answerIndex) setScore(s => s + 1)
    setPhase('feedback')
    setTimeout(advance, 1400)
  }

  function restart() {
    setCurrent(0); setSelected(null); setScore(0)
    setTimeLeft(TIME_PER_Q); setPhase('question'); setShowResult(false)
  }

  if (!questions.length) return null
  const q = questions[current]
  const progress = (current / questions.length) * 100
  const timePct = (timeLeft / TIME_PER_Q) * 100

  return (
    <div className="min-h-dvh flex flex-col bg-[#0D1117]">
      <PageHeader
        title="Quiz"
        color="#D2A8FF"
        right={<span className="text-sm text-[#8B949E]">{score}/{current} pts</span>}
      />

      <div className="flex-1 flex flex-col px-4 py-4 gap-5 max-w-xl mx-auto w-full">
        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-[#8B949E]">
            <span>Question {current + 1} of {questions.length}</span>
            <span>{q.category}</span>
          </div>
          <div className="h-1.5 bg-[#21262D] rounded-full overflow-hidden">
            <div className="h-full bg-[#D2A8FF] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Timer */}
        <div className="space-y-1">
          <div className={`h-2 rounded-full overflow-hidden bg-[#21262D]`}>
            <div
              className={`h-full rounded-full transition-all duration-1000 ${timeLeft > 10 ? 'bg-[#3FB950]' : timeLeft > 5 ? 'bg-[#E3B341]' : 'bg-red-500'}`}
              style={{ width: `${timePct}%` }}
            />
          </div>
          <p className="text-xs text-right text-[#8B949E]">{timeLeft}s</p>
        </div>

        {/* Question */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-5">
          <p className="text-white text-base font-medium leading-snug">{q.question}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-2">
          {q.options.map((opt, i) => {
            let style = 'border-[#30363D] bg-[#161B22] hover:border-[#8B949E]'
            if (phase === 'feedback') {
              if (i === q.answerIndex) style = 'border-[#3FB950] bg-[#3FB950]/15'
              else if (i === selected) style = 'border-red-500 bg-red-900/20'
            }
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={phase !== 'question'}
                className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all active:scale-[0.98] ${style}`}
              >
                <span className="text-[#8B949E] font-bold mr-3">{String.fromCharCode(65 + i)}.</span>
                <span className="text-white text-sm">{opt}</span>
              </button>
            )
          })}
        </div>
      </div>

      {showResult && (
        <GameResultModal
          won={score >= Math.floor(questions.length * 0.6)}
          title={score === questions.length ? '🎯 Perfect!' : score >= 7 ? 'Great job!' : score >= 5 ? 'Not bad!' : 'Keep practising!'}
          message={`You scored ${score} out of ${questions.length}.`}
          shareText={`❓ Football Quiz\n${score}/${questions.length} ⚽`}
          onPlayAgain={restart}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  )
}
