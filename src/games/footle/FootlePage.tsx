import { useState } from 'react'
import PageHeader from '../../shared/components/PageHeader'
import GameResultModal from '../../shared/components/GameResultModal'
import { getFlag } from '../../shared/utils/flags'
import { createFootle, submitGuess, PLAYER_POOL, type FootleState, type HintStatus } from './footleGame'

const HINT_STYLES: Record<HintStatus, string> = {
  correct: 'bg-[#3FB950]  border-[#3FB950]  text-white',
  close:   'bg-[#E3B341]  border-[#E3B341]  text-black',
  wrong:   'bg-[#21262D]  border-[#30363D]  text-[#8B949E]',
}

const COL_LABELS = ['Player', 'Nation', 'Position', 'Age', 'Club']

export default function FootlePage() {
  const [state, setState] = useState<FootleState>(createFootle)
  const [query, setQuery] = useState('')
  const [showResult, setShowResult] = useState(false)
  const over = state.status !== 'playing'

  const suggestions = query.length >= 2
    ? PLAYER_POOL.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : []

  function guess(name: string) {
    const player = PLAYER_POOL.find(p => p.name.toLowerCase() === name.toLowerCase())
    if (!player || over || state.guesses.some(g => g.player.name === player.name)) return
    const next = submitGuess(state, player)
    setState(next); setQuery('')
    if (next.status !== 'playing') setTimeout(() => setShowResult(true), 700)
  }

  function restart() { setState(createFootle()); setQuery(''); setShowResult(false) }

  const attemptsUsed = state.guesses.length
  const shareGrid = state.guesses.map(g =>
    [g.hints.name, g.hints.nationality, g.hints.position, g.hints.age, g.hints.club]
      .map(h => h === 'correct' ? '🟩' : h === 'close' ? '🟨' : '⬛').join('')
  ).join('\n')

  return (
    <div className="min-h-dvh flex flex-col bg-[#0D1117]">
      <PageHeader
        title="Footle"
        color="#3FB950"
        right={
          <div className="flex gap-1">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i < attemptsUsed
                  ? state.status === 'won' && i === attemptsUsed - 1
                    ? 'bg-[#3FB950]'
                    : 'bg-[#8B949E]'
                  : 'bg-[#30363D]'
              }`} />
            ))}
          </div>
        }
      />

      <div className="flex-1 flex flex-col items-center px-3 py-4 gap-4 max-w-2xl mx-auto w-full">

        {/* Column headers */}
        <div className="grid grid-cols-5 gap-1 w-full">
          {COL_LABELS.map(l => (
            <div key={l} className="text-center text-[9px] uppercase font-bold tracking-wide text-[#8B949E] py-1">{l}</div>
          ))}
        </div>

        {/* Guess rows */}
        <div className="flex flex-col gap-1.5 w-full">
          {state.guesses.map((g, i) => (
            <div key={i} className="grid grid-cols-5 gap-1">
              <Cell value={g.player.name}                        status={g.hints.name}        />
              <Cell value={`${getFlag(g.player.nationality)} ${g.player.nationality}`} status={g.hints.nationality} small />
              <Cell value={g.player.position}                    status={g.hints.position}    small />
              <Cell
                value={String(g.player.age)}
                status={g.hints.age}
                suffix={g.hints.ageDirection === 'higher' ? ' ▲' : g.hints.ageDirection === 'lower' ? ' ▼' : ''}
              />
              <Cell value={g.player.club} status={g.hints.club} small />
            </div>
          ))}

          {/* Empty placeholder rows */}
          {Array.from({ length: Math.max(0, 6 - state.guesses.length) }, (_, i) => (
            <div key={`e${i}`} className="grid grid-cols-5 gap-1">
              {Array.from({ length: 5 }, (_, j) => (
                <div key={j} className={`h-11 rounded-xl border border-[#21262D] ${i === 0 && !over ? 'border-dashed border-[#30363D]' : ''}`} />
              ))}
            </div>
          ))}
        </div>

        {/* Input */}
        {!over && (
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && suggestions[0] && guess(suggestions[0].name)}
              placeholder="Type a player name…"
              autoCapitalize="words"
              className="w-full bg-[#161B22] border border-[#30363D] focus:border-[#3FB950] rounded-2xl px-4 py-3.5 text-white text-sm outline-none transition-colors placeholder:text-[#8B949E]"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-2 bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden shadow-2xl">
                {suggestions.map(p => (
                  <li key={p.name} className="border-b border-[#21262D] last:border-0">
                    <button
                      onClick={() => guess(p.name)}
                      className="w-full text-left px-4 py-3 hover:bg-[#21262D] active:bg-[#30363D] transition-colors"
                    >
                      <span className="text-white text-sm font-medium">{p.name}</span>
                      <span className="text-[#8B949E] text-xs ml-2">
                        {getFlag(p.nationality)} {p.nationality} · {p.position} · {p.club}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Reveal answer if lost */}
        {state.status === 'lost' && (
          <div className="bg-[#161B22] border border-red-500/30 rounded-2xl p-4 text-center">
            <p className="text-[#8B949E] text-xs mb-1">The player was</p>
            <p className="text-white font-bold text-lg">{state.target.name}</p>
            <p className="text-[#8B949E] text-xs mt-1">
              {getFlag(state.target.nationality)} {state.target.nationality} · {state.target.position} · Age {state.target.age}
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="flex gap-4 text-xs text-[#8B949E]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#3FB950] inline-block"/> Correct</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#E3B341] inline-block"/> Close</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#21262D] border border-[#30363D] inline-block"/> Wrong</span>
        </div>
      </div>

      {showResult && (
        <GameResultModal
          won={state.status === 'won'}
          title={state.status === 'won' ? 'Correct!' : 'Game Over'}
          message={state.status === 'won'
            ? `Got it in ${attemptsUsed} guess${attemptsUsed === 1 ? '' : 'es'}!`
            : `The answer was ${state.target.name}.`}
          shareText={`🟩 Footle — ${state.status === 'won' ? `${attemptsUsed}/6` : 'X/6'}\n${shareGrid}`}
          onPlayAgain={restart}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  )
}

function Cell({ value, status, suffix = '', small = false }: {
  value: string; status: HintStatus; suffix?: string; small?: boolean
}) {
  return (
    <div className={`h-11 rounded-xl border flex items-center justify-center px-1 transition-colors ${HINT_STYLES[status]}`}>
      <span className={`font-semibold text-center leading-tight line-clamp-2 ${small ? 'text-[9px]' : 'text-[10px]'}`}>
        {value}{suffix}
      </span>
    </div>
  )
}
