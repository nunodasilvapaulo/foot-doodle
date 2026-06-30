import { useState } from 'react'
import PageHeader from '../../shared/components/PageHeader'
import GameResultModal from '../../shared/components/GameResultModal'
import { createFootle, submitGuess, PLAYER_POOL, type FootleState, type HintStatus } from './footleGame'

const HINT_COLORS: Record<HintStatus, string> = {
  correct: 'bg-[#3FB950] border-[#3FB950]',
  close:   'bg-[#E3B341] border-[#E3B341]',
  wrong:   'bg-[#21262D] border-[#30363D]',
}

const ATTRS = ['name', 'nationality', 'position', 'age', 'club'] as const

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
    if (!player || over) return
    if (state.guesses.some(g => g.player.name === player.name)) return
    const next = submitGuess(state, player)
    setState(next)
    setQuery('')
    if (next.status !== 'playing') setTimeout(() => setShowResult(true), 600)
  }

  function restart() {
    setState(createFootle())
    setQuery('')
    setShowResult(false)
  }

  const attemptsLeft = 6 - state.guesses.length

  return (
    <div className="min-h-dvh flex flex-col bg-[#0D1117]">
      <PageHeader
        title="Footle"
        color="#3FB950"
        right={
          <span className="text-sm text-[#8B949E]">
            {over ? (state.status === 'won' ? '✅' : '❌') : `${attemptsLeft} left`}
          </span>
        }
      />

      <div className="flex-1 flex flex-col items-center px-4 py-4 gap-5 max-w-xl mx-auto w-full">
        {/* Column headers */}
        <div className="grid grid-cols-5 gap-1 w-full text-center">
          {ATTRS.map(a => (
            <div key={a} className="text-[10px] uppercase font-semibold text-[#8B949E] py-1">{a}</div>
          ))}
        </div>

        {/* Guess rows */}
        <div className="flex flex-col gap-1 w-full">
          {state.guesses.map((g, i) => (
            <div key={i} className="grid grid-cols-5 gap-1">
              <Cell value={g.player.name}        status={g.hints.name}        />
              <Cell value={g.player.nationality}  status={g.hints.nationality} />
              <Cell value={g.player.position}     status={g.hints.position}    />
              <Cell
                value={String(g.player.age)}
                status={g.hints.age}
                suffix={g.hints.ageDirection === 'higher' ? '▲' : g.hints.ageDirection === 'lower' ? '▼' : ''}
              />
              <Cell value={g.player.club}         status={g.hints.club}        />
            </div>
          ))}

          {/* Empty rows */}
          {Array.from({ length: Math.max(0, 6 - state.guesses.length) }, (_, i) => (
            <div key={`empty-${i}`} className="grid grid-cols-5 gap-1">
              {ATTRS.map(a => (
                <div key={a} className="h-10 rounded-lg border border-[#30363D] bg-[#161B22]" />
              ))}
            </div>
          ))}
        </div>

        {/* Input */}
        {!over && (
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && suggestions[0] && guess(suggestions[0].name)}
              placeholder="Type a player name…"
              className="w-full bg-[#161B22] border border-[#30363D] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#3FB950] transition-colors"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden shadow-2xl">
                {suggestions.map(p => (
                  <li key={p.name}>
                    <button
                      onClick={() => guess(p.name)}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#21262D] text-white text-sm transition-colors"
                    >
                      {p.name} <span className="text-[#8B949E]">· {p.nationality} · {p.position}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="flex gap-4 text-xs text-[#8B949E]">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#3FB950] inline-block"/> Correct</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#E3B341] inline-block"/> Close</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#21262D] border border-[#30363D] inline-block"/> Wrong</span>
        </div>
      </div>

      {showResult && (
        <GameResultModal
          won={state.status === 'won'}
          title={state.status === 'won' ? 'Correct!' : 'Game Over'}
          message={state.status === 'won'
            ? `You got it in ${state.guesses.length} guess${state.guesses.length === 1 ? '' : 'es'}!`
            : `The player was ${state.target.name}.`}
          shareText={`🟩 Footle — ${state.status === 'won' ? state.guesses.length + '/6' : 'X/6'}\n${state.guesses.map(g => ATTRS.map(a => a === 'name' ? (g.hints.name === 'correct' ? '🟩' : '⬛') : g.hints[a] === 'correct' ? '🟩' : g.hints[a] === 'close' ? '🟨' : '⬛').join('')).join('\n')}`}
          onPlayAgain={restart}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  )
}

function Cell({ value, status, suffix = '' }: { value: string; status: HintStatus; suffix?: string }) {
  return (
    <div className={`h-10 rounded-lg border flex items-center justify-center px-1 ${HINT_COLORS[status]}`}>
      <span className="text-white text-[10px] font-medium text-center leading-tight line-clamp-2">
        {value}{suffix && <span className="ml-0.5">{suffix}</span>}
      </span>
    </div>
  )
}
