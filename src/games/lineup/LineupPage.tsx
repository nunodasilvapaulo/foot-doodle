import { useState } from 'react'
import PageHeader from '../../shared/components/PageHeader'
import GameResultModal from '../../shared/components/GameResultModal'
import { LINEUPS, type LineupSlot } from '../../data/lineups'

export default function LineupPage() {
  const [puzzleIdx] = useState(() => Math.floor(Math.random() * LINEUPS.length))
  const puzzle = LINEUPS[puzzleIdx]

  const [guesses, setGuesses] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})
  const [activeSlot, setActiveSlot] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [mistakes, setMistakes] = useState(0)

  const MAX_MISTAKES = 5

  function selectSlot(id: string) {
    if (submitted[id]) return
    setActiveSlot(id)
    setInputValue(guesses[id] ?? '')
  }

  function submitGuess(slotId: string) {
    const slot = puzzle.slots.find(s => s.id === slotId)!
    const correct = inputValue.trim().toLowerCase().split(' ').some(word =>
      slot.name.toLowerCase().includes(word) && word.length > 3
    )
    setSubmitted(prev => ({ ...prev, [slotId]: correct }))
    if (!correct) {
      setMistakes(m => m + 1)
      if (mistakes + 1 >= MAX_MISTAKES) setTimeout(() => setShowResult(true), 600)
    }
    setGuesses(prev => ({ ...prev, [slotId]: inputValue }))
    setActiveSlot(null)
    setInputValue('')

    // Check if all correct
    const newSubmitted = { ...submitted, [slotId]: correct }
    if (puzzle.slots.every(s => newSubmitted[s.id])) setTimeout(() => setShowResult(true), 600)
  }

  function restart() {
    setGuesses({}); setSubmitted({}); setActiveSlot(null); setInputValue('')
    setShowResult(false); setMistakes(0)
  }

  const correctCount = puzzle.slots.filter(s => submitted[s.id]).length

  return (
    <div className="min-h-dvh flex flex-col bg-[#0D1117]">
      <PageHeader
        title="Lineup Builder"
        color="#58A6FF"
        right={
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8B949E]">{correctCount}/{puzzle.slots.length}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: MAX_MISTAKES }, (_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i < mistakes ? 'bg-red-500' : 'bg-[#30363D]'}`} />
              ))}
            </div>
          </div>
        }
      />

      <div className="flex-1 flex flex-col items-center px-4 py-3 gap-4 max-w-xl mx-auto w-full">
        <div className="text-center">
          <p className="text-white font-semibold text-sm">{puzzle.title}</p>
          <p className="text-[#8B949E] text-xs">{puzzle.formation} · Tap a position to guess</p>
        </div>

        {/* SVG Pitch */}
        <div className="relative w-full" style={{ paddingTop: '140%' }}>
          <svg
            viewBox="0 0 100 140"
            className="absolute inset-0 w-full h-full"
            style={{ background: '#2D5A27' }}
          >
            {/* Pitch markings */}
            <rect x="5" y="5" width="90" height="130" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            <line x1="5" y1="70" x2="95" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            <circle cx="50" cy="70" r="9" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            <circle cx="50" cy="70" r="0.8" fill="rgba(255,255,255,0.6)" />
            {/* Penalty areas */}
            <rect x="22" y="5" width="56" height="20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            <rect x="22" y="115" width="56" height="20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            {/* Goals */}
            <rect x="38" y="3" width="24" height="4" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            <rect x="38" y="133" width="24" height="4" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />

            {/* Player slots */}
            {puzzle.slots.map(slot => (
              <PlayerDot
                key={slot.id}
                slot={slot}
                isCorrect={!!submitted[slot.id]}
                isActive={activeSlot === slot.id}
                hasGuess={!!guesses[slot.id]}
                onClick={() => selectSlot(slot.id)}
              />
            ))}
          </svg>
        </div>

        {/* Input panel */}
        {activeSlot && (
          <div className="w-full bg-[#161B22] border border-[#30363D] rounded-2xl p-4 space-y-3">
            {(() => {
              const slot = puzzle.slots.find(s => s.id === activeSlot)!
              return (
                <>
                  <p className="text-[#8B949E] text-xs">
                    Guessing: <span className="text-[#58A6FF] font-semibold">{slot.hint}</span>
                  </p>
                  <input
                    autoFocus
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && inputValue.trim() && submitGuess(activeSlot)}
                    placeholder="Player name…"
                    className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#58A6FF]"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => submitGuess(activeSlot)}
                      disabled={!inputValue.trim()}
                      className="flex-1 bg-[#58A6FF] disabled:bg-[#30363D] text-black disabled:text-[#8B949E] font-bold rounded-xl py-2.5 text-sm"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => { setActiveSlot(null); setInputValue('') }}
                      className="px-4 bg-[#21262D] text-[#8B949E] rounded-xl py-2.5 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )
            })()}
          </div>
        )}
      </div>

      {showResult && (
        <GameResultModal
          won={correctCount === puzzle.slots.length}
          title={correctCount === puzzle.slots.length ? 'Full XI!' : 'Game Over'}
          message={`You identified ${correctCount} out of ${puzzle.slots.length} players.`}
          shareText={`📋 Lineup Builder — ${puzzle.title}\n${correctCount}/${puzzle.slots.length} players ⚽`}
          onPlayAgain={restart}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  )
}

function PlayerDot({ slot, isCorrect, isActive, hasGuess, onClick }: {
  slot: LineupSlot
  isCorrect: boolean
  isActive: boolean
  hasGuess: boolean
  onClick: () => void
}) {
  const cx = slot.x
  const cy = slot.y
  const color = isCorrect ? '#3FB950' : isActive ? '#58A6FF' : hasGuess ? '#E3B341' : '#E6EDF3'

  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      <circle cx={cx} cy={cy} r="5" fill={`${color}30`} stroke={color} strokeWidth="1" />
      <circle cx={cx} cy={cy} r="2.5" fill={color} />
      <text x={cx} y={cy + 9} textAnchor="middle" fill="white" fontSize="3.5" fontWeight="600">
        {isCorrect ? slot.name.split(' ').at(-1) : slot.hint.split('·')[0].trim()}
      </text>
    </g>
  )
}
