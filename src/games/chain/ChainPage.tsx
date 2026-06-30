import { useState } from 'react'
import PageHeader from '../../shared/components/PageHeader'
import GameResultModal from '../../shared/components/GameResultModal'
import { PLAYER_POOL, type FootlePlayer } from '../footle/footleGame'

interface ChainLink {
  player: FootlePlayer
  sharedClub: string | null  // club shared with previous player in chain
}

interface Puzzle {
  start: FootlePlayer
  end: FootlePlayer
  maxSteps: number
  solution: string[]  // player names in order, for hint
}

const PUZZLES: Puzzle[] = [
  {
    start: PLAYER_POOL.find(p => p.name === 'Cristiano Ronaldo')!,
    end:   PLAYER_POOL.find(p => p.name === 'Kylian Mbappé')!,
    maxSteps: 4,
    solution: ['Cristiano Ronaldo', 'Vinicius Jr', 'Kylian Mbappé'],
  },
  {
    start: PLAYER_POOL.find(p => p.name === 'Lionel Messi')!,
    end:   PLAYER_POOL.find(p => p.name === 'Erling Haaland')!,
    maxSteps: 4,
    solution: ['Lionel Messi', 'Kevin De Bruyne', 'Erling Haaland'],
  },
  {
    start: PLAYER_POOL.find(p => p.name === 'Mohamed Salah')!,
    end:   PLAYER_POOL.find(p => p.name === 'Harry Kane')!,
    maxSteps: 5,
    solution: ['Mohamed Salah', 'Virgil van Dijk', 'Harry Kane'],
  },
  {
    start: PLAYER_POOL.find(p => p.name === 'Bruno Fernandes')!,
    end:   PLAYER_POOL.find(p => p.name === 'Jude Bellingham')!,
    maxSteps: 4,
    solution: ['Bruno Fernandes', 'Cristiano Ronaldo', 'Vinicius Jr', 'Jude Bellingham'],
  },
]

function sharedClub(a: FootlePlayer, b: FootlePlayer): string | null {
  if (a.club === b.club) return a.club
  // For the offline pool we use known historical links
  const links: [string, string, string][] = [
    ['Cristiano Ronaldo', 'Vinicius Jr',       'Real Madrid'],
    ['Vinicius Jr',       'Kylian Mbappé',     'Real Madrid'],
    ['Lionel Messi',      'Kevin De Bruyne',   'Barcelona / City (different)'],
    ['Kevin De Bruyne',   'Erling Haaland',    'Manchester City'],
    ['Mohamed Salah',     'Virgil van Dijk',   'Liverpool'],
    ['Virgil van Dijk',   'Harry Kane',        'Liverpool / Tottenham (different)'],
    ['Bruno Fernandes',   'Cristiano Ronaldo', 'Manchester United'],
    ['Jude Bellingham',   'Vinicius Jr',       'Real Madrid'],
    ['Phil Foden',        'Kevin De Bruyne',   'Manchester City'],
    ['Phil Foden',        'Erling Haaland',    'Manchester City'],
    ['Rodri',             'Kevin De Bruyne',   'Manchester City'],
  ]
  for (const [pa, pb, club] of links) {
    if ((pa === a.name && pb === b.name) || (pa === b.name && pb === a.name)) return club
  }
  if (a.club === b.club) return a.club
  return null
}

export default function ChainPage() {
  const [puzzleIdx] = useState(() => Math.floor(Math.random() * PUZZLES.length))
  const puzzle = PUZZLES[puzzleIdx]

  const [chain, setChain] = useState<ChainLink[]>([{ player: puzzle.start, sharedClub: null }])
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [won, setWon] = useState(false)

  const over = won || chain.length > puzzle.maxSteps
  const suggestions = query.length >= 2
    ? PLAYER_POOL.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        !chain.some(c => c.player.name === p.name)
      ).slice(0, 6)
    : []

  function addPlayer(player: FootlePlayer) {
    const last = chain[chain.length - 1].player
    const club = sharedClub(last, player)
    if (!club) {
      setError(`${last.name} and ${player.name} never played at the same club.`)
      setTimeout(() => setError(''), 2500)
      setQuery('')
      return
    }
    const newChain: ChainLink[] = [...chain, { player, sharedClub: club }]
    setChain(newChain)
    setQuery('')

    if (player.name === puzzle.end.name) {
      setWon(true)
      setTimeout(() => setShowResult(true), 600)
    } else if (newChain.length > puzzle.maxSteps) {
      setTimeout(() => setShowResult(true), 600)
    }
  }

  function restart() {
    setChain([{ player: puzzle.start, sharedClub: null }])
    setQuery(''); setError(''); setShowResult(false); setWon(false)
  }

  return (
    <div className="min-h-dvh flex flex-col bg-[#0D1117]">
      <PageHeader
        title="Transfer Chain"
        color="#FF7B72"
        right={<span className="text-sm text-[#8B949E]">{chain.length - 1}/{puzzle.maxSteps} steps</span>}
      />

      <div className="flex-1 flex flex-col items-center px-4 py-4 gap-4 max-w-xl mx-auto w-full">
        {/* Goal */}
        <div className="w-full bg-[#161B22] border border-[#FF7B72]/40 rounded-2xl p-4 flex items-center justify-between">
          <div className="text-center">
            <p className="text-xs text-[#8B949E]">From</p>
            <p className="text-white font-bold text-sm">{puzzle.start.name}</p>
          </div>
          <span className="text-[#FF7B72] text-xl">⛓️</span>
          <div className="text-center">
            <p className="text-xs text-[#8B949E]">To</p>
            <p className="text-white font-bold text-sm">{puzzle.end.name}</p>
          </div>
        </div>

        <p className="text-[#8B949E] text-xs text-center">
          Connect them through shared clubs in ≤ {puzzle.maxSteps} steps
        </p>

        {/* Chain visualization */}
        <div className="w-full space-y-2">
          {chain.map((link, i) => (
            <div key={i}>
              {i > 0 && link.sharedClub && (
                <div className="flex items-center justify-center gap-2 py-1">
                  <div className="h-px flex-1 bg-[#30363D]" />
                  <span className="text-[#8B949E] text-xs px-2">⬆ {link.sharedClub}</span>
                  <div className="h-px flex-1 bg-[#30363D]" />
                </div>
              )}
              <div className={`flex items-center gap-3 p-3 rounded-xl border ${
                link.player.name === puzzle.end.name && won
                  ? 'border-[#3FB950] bg-[#3FB950]/10'
                  : 'border-[#30363D] bg-[#161B22]'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  link.player.name === puzzle.start.name ? 'bg-[#FF7B72]/20 text-[#FF7B72]' :
                  link.player.name === puzzle.end.name && won ? 'bg-[#3FB950]/20 text-[#3FB950]' :
                  'bg-[#21262D] text-[#8B949E]'
                }`}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{link.player.name}</p>
                  <p className="text-[#8B949E] text-xs">{link.player.club} · {link.player.nationality}</p>
                </div>
              </div>
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
              placeholder="Add next player in the chain…"
              className="w-full bg-[#161B22] border border-[#30363D] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#FF7B72]"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden shadow-2xl">
                {suggestions.map(p => (
                  <li key={p.name}>
                    <button
                      onClick={() => addPlayer(p)}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#21262D] text-white text-sm"
                    >
                      {p.name} <span className="text-[#8B949E]">· {p.club}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* Hint */}
        <details className="w-full">
          <summary className="text-[#8B949E] text-xs cursor-pointer hover:text-white">Show example solution</summary>
          <p className="text-[#8B949E] text-xs mt-2 bg-[#161B22] rounded-xl p-3">
            {puzzle.solution.join(' → ')}
          </p>
        </details>
      </div>

      {showResult && (
        <GameResultModal
          won={won}
          title={won ? 'Chain Complete!' : 'Too many steps!'}
          message={won
            ? `You connected them in ${chain.length - 1} step${chain.length - 1 === 1 ? '' : 's'}!`
            : `The chain needed to be completed in ≤ ${puzzle.maxSteps} steps.`}
          shareText={`⛓️ Transfer Chain\n${puzzle.start.name} → ${puzzle.end.name}\n${won ? `✅ ${chain.length - 1} steps` : '❌ Too long'}`}
          onPlayAgain={restart}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  )
}
