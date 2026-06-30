import { useState } from 'react'
import PageHeader from '../../shared/components/PageHeader'
import GameResultModal from '../../shared/components/GameResultModal'
import { LINEUPS, type LineupSlot } from '../../data/lineups'

const MAX_MISTAKES = 5

export default function LineupPage() {
  const [puzzleIdx] = useState(() => Math.floor(Math.random() * LINEUPS.length))
  const puzzle = LINEUPS[puzzleIdx]

  const [guesses, setGuesses] = useState<Record<string, string>>({})
  const [correct, setCorrect] = useState<Record<string, boolean>>({})
  const [activeSlot, setActiveSlot] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [wrongFlash, setWrongFlash] = useState<string | null>(null)

  const correctCount = Object.values(correct).filter(Boolean).length
  const over = mistakes >= MAX_MISTAKES || correctCount === puzzle.slots.length

  function selectSlot(id: string) {
    if (correct[id] || over) return
    setActiveSlot(id); setInputValue(guesses[id] ?? '')
  }

  function submitGuess(slotId: string) {
    const slot = puzzle.slots.find(s => s.id === slotId)!
    const val = inputValue.trim().toLowerCase()
    const isCorrect = slot.name.toLowerCase().split(' ').some(word => word.length > 2 && val.includes(word))
      || val === slot.name.toLowerCase()
    const nextCorrect = { ...correct, [slotId]: isCorrect }
    setCorrect(nextCorrect)
    setGuesses(g => ({ ...g, [slotId]: inputValue.trim() }))
    if (!isCorrect) {
      const nextMistakes = mistakes + 1
      setMistakes(nextMistakes)
      setWrongFlash(slotId)
      setTimeout(() => setWrongFlash(null), 700)
      if (nextMistakes >= MAX_MISTAKES) setTimeout(() => setShowResult(true), 700)
    }
    setActiveSlot(null); setInputValue('')
    const allDone = puzzle.slots.every(s => nextCorrect[s.id])
    if (allDone) setTimeout(() => setShowResult(true), 500)
  }

  function restart() {
    setGuesses({}); setCorrect({}); setActiveSlot(null)
    setInputValue(''); setShowResult(false); setMistakes(0)
  }

  const activeSlotData = puzzle.slots.find(s => s.id === activeSlot)

  return (
    <div className="min-h-dvh flex flex-col bg-[#0D1117]">
      <PageHeader
        title="Lineup Builder"
        color="#58A6FF"
        right={
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#3FB950] font-bold">{correctCount}</span>
            <span className="text-[#30363D]">/</span>
            <span className="text-[#8B949E]">{puzzle.slots.length}</span>
            <div className="flex gap-0.5 ml-1">
              {Array.from({ length: MAX_MISTAKES }, (_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i < mistakes ? 'bg-red-500' : 'bg-[#30363D]'}`} />
              ))}
            </div>
          </div>
        }
      />

      <div className="flex-1 flex flex-col items-center px-4 py-3 gap-3 max-w-xl mx-auto w-full">
        <div className="text-center">
          <p className="text-white font-bold">{puzzle.title}</p>
          <p className="text-[#8B949E] text-xs mt-0.5">{puzzle.formation} · Tap a position to guess</p>
        </div>

        {/* SVG Pitch */}
        <div className="relative w-full max-w-sm" style={{ paddingTop: '140%' }}>
          <svg viewBox="0 0 100 140" className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
            {/* Grass gradient */}
            <defs>
              <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a5425"/>
                <stop offset="100%" stopColor="#1e4019"/>
              </linearGradient>
            </defs>
            <rect width="100" height="140" fill="url(#grass)"/>

            {/* Pitch markings */}
            <rect x="5" y="5" width="90" height="130" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5"/>
            <line x1="5" y1="70" x2="95" y2="70" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5"/>
            <circle cx="50" cy="70" r="9" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5"/>
            <circle cx="50" cy="70" r="0.8" fill="rgba(255,255,255,0.6)"/>
            <rect x="22" y="5" width="56" height="20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
            <rect x="22" y="115" width="56" height="20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
            <rect x="35" y="5" width="30" height="10" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4"/>
            <rect x="35" y="125" width="30" height="10" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4"/>
            <rect x="41" y="3" width="18" height="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4"/>
            <rect x="41" y="134" width="18" height="3" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4"/>
            <circle cx="50" cy="17" r="0.6" fill="rgba(255,255,255,0.5)"/>
            <circle cx="50" cy="123" r="0.6" fill="rgba(255,255,255,0.5)"/>

            {/* Players */}
            {puzzle.slots.map(slot => (
              <PlayerDot
                key={slot.id}
                slot={slot}
                isCorrect={!!correct[slot.id]}
                isActive={activeSlot === slot.id}
                isWrong={wrongFlash === slot.id}
                hasGuess={!!guesses[slot.id]}
                onClick={() => selectSlot(slot.id)}
              />
            ))}
          </svg>
        </div>

        {/* Input panel */}
        {activeSlot && activeSlotData && (
          <div className="w-full bg-[#161B22] border border-[#58A6FF]/40 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#58A6FF]"/>
              <p className="text-[#8B949E] text-xs">
                Guessing: <span className="text-[#58A6FF] font-semibold">{activeSlotData.hint}</span>
              </p>
            </div>
            <input
              autoFocus
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && inputValue.trim() && submitGuess(activeSlot)}
              placeholder="Type player name…"
              className="w-full bg-[#0D1117] border border-[#30363D] focus:border-[#58A6FF] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
            />
            <div className="flex gap-2">
              <button
                onClick={() => submitGuess(activeSlot)}
                disabled={!inputValue.trim()}
                className="flex-1 bg-[#58A6FF] disabled:bg-[#30363D] text-black disabled:text-[#8B949E] font-bold rounded-xl py-3 text-sm transition-all active:scale-95"
              >
                Confirm
              </button>
              <button
                onClick={() => { setActiveSlot(null); setInputValue('') }}
                className="px-5 bg-[#21262D] hover:bg-[#30363D] text-[#8B949E] rounded-xl py-3 text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {showResult && (
        <GameResultModal
          won={correctCount === puzzle.slots.length}
          title={correctCount === puzzle.slots.length ? 'Full XI! 🎉' : 'Time\'s up!'}
          message={`You identified ${correctCount} out of ${puzzle.slots.length} players.`}
          shareText={`📋 Lineup Builder — ${puzzle.title}\n${correctCount}/${puzzle.slots.length} ⚽`}
          onPlayAgain={restart}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  )
}

function PlayerDot({ slot, isCorrect, isActive, isWrong, hasGuess, onClick }: {
  slot: LineupSlot; isCorrect: boolean; isActive: boolean
  isWrong: boolean; hasGuess: boolean; onClick: () => void
}) {
  const cx = slot.x, cy = slot.y
  const color = isWrong ? '#ef4444' : isCorrect ? '#3FB950' : isActive ? '#58A6FF' : hasGuess ? '#E3B341' : 'white'
  const label = isCorrect ? slot.name.split(' ').at(-1)! : slot.hint.split('·')[0].trim()

  return (
    <g onClick={onClick} style={{ cursor: isCorrect ? 'default' : 'pointer' }}>
      <circle cx={cx} cy={cy} r="6" fill={`${color}25`} stroke={color} strokeWidth={isActive ? '1.5' : '1'}/>
      <circle cx={cx} cy={cy} r="3" fill={color}/>
      <text x={cx} y={cy + 10.5} textAnchor="middle" fill="white" fontSize="3.2" fontWeight="700"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
        {label}
      </text>
    </g>
  )
}
