import { useState } from 'react'
import PageHeader from '../../shared/components/PageHeader'
import GameResultModal from '../../shared/components/GameResultModal'
import PlayerAvatar from '../../shared/components/PlayerAvatar'
import { getFlag } from '../../shared/utils/flags'
import { PLAYER_POOL, type FootlePlayer } from '../footle/footleGame'

interface ChainLink { player: FootlePlayer; sharedClub: string | null }

interface Puzzle { start: FootlePlayer; end: FootlePlayer; maxSteps: number }

const KNOWN_LINKS: [string, string, string][] = [
  ['Cristiano Ronaldo', 'Vinicius Jr',       'Real Madrid'],
  ['Vinicius Jr',       'Kylian Mbappé',     'Real Madrid'],
  ['Kylian Mbappé',     'Cristiano Ronaldo', 'Real Madrid'],
  ['Kevin De Bruyne',   'Erling Haaland',    'Manchester City'],
  ['Kevin De Bruyne',   'Phil Foden',        'Manchester City'],
  ['Kevin De Bruyne',   'Rodri',             'Manchester City'],
  ['Erling Haaland',    'Phil Foden',        'Manchester City'],
  ['Erling Haaland',    'Rodri',             'Manchester City'],
  ['Mohamed Salah',     'Virgil van Dijk',   'Liverpool'],
  ['Mohamed Salah',     'Trent Alexander-Arnold', 'Liverpool'],
  ['Mohamed Salah',     'Andrew Robertson',  'Liverpool'],
  ['Mohamed Salah',     'Alisson',           'Liverpool'],
  ['Virgil van Dijk',   'Trent Alexander-Arnold', 'Liverpool'],
  ['Bruno Fernandes',   'Casemiro',          'Manchester United'],
  ['Bruno Fernandes',   'Cristiano Ronaldo', 'Manchester United'],
  ['Jude Bellingham',   'Vinicius Jr',       'Real Madrid'],
  ['Jude Bellingham',   'Luka Modrić',       'Real Madrid'],
  ['Jude Bellingham',   'Cristiano Ronaldo', 'Borussia Dortmund'],
  ['Harry Kane',        'Son Heung-min',     'Tottenham'],
  ['Jamal Musiala',     'Thomas Müller',     'Bayern Munich'],
  ['Alphonso Davies',   'Thomas Müller',     'Bayern Munich'],
  ['Alphonso Davies',   'Harry Kane',        'Bayern Munich'],
  ['Sadio Mané',        'Mohamed Salah',     'Liverpool'],
  ['Antoine Griezmann', 'Lionel Messi',      'Barcelona'],
  ['Antoine Griezmann', 'Lionel Messi',      'Paris SG'],
  ['Neymar Jr',         'Lionel Messi',      'Barcelona'],
  ['Neymar Jr',         'Lionel Messi',      'Paris SG'],
  ['Neymar Jr',         'Kylian Mbappé',     'Paris SG'],
  ['Romelu Lukaku',     'Lautaro Martínez',  'Inter Milan'],
]

function findSharedClub(a: FootlePlayer, b: FootlePlayer): string | null {
  if (a.club === b.club) return a.club
  for (const [pa, pb, club] of KNOWN_LINKS) {
    if ((pa === a.name && pb === b.name) || (pa === b.name && pb === a.name)) return club
  }
  return null
}

const PUZZLES: Puzzle[] = [
  { start: PLAYER_POOL.find(p => p.name === 'Cristiano Ronaldo')!, end: PLAYER_POOL.find(p => p.name === 'Erling Haaland')!,   maxSteps: 4 },
  { start: PLAYER_POOL.find(p => p.name === 'Lionel Messi')!,      end: PLAYER_POOL.find(p => p.name === 'Kylian Mbappé')!,    maxSteps: 3 },
  { start: PLAYER_POOL.find(p => p.name === 'Mohamed Salah')!,     end: PLAYER_POOL.find(p => p.name === 'Harry Kane')!,       maxSteps: 4 },
  { start: PLAYER_POOL.find(p => p.name === 'Bruno Fernandes')!,   end: PLAYER_POOL.find(p => p.name === 'Jude Bellingham')!,  maxSteps: 4 },
]

export default function ChainPage() {
  const [puzzleIdx] = useState(() => Math.floor(Math.random() * PUZZLES.length))
  const puzzle = PUZZLES[puzzleIdx]

  const [chain, setChain] = useState<ChainLink[]>([{ player: puzzle.start, sharedClub: null }])
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [won, setWon] = useState(false)

  const over = won || chain.length > puzzle.maxSteps
  const steps = chain.length - 1

  const suggestions = query.length >= 2
    ? PLAYER_POOL.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        !chain.some(c => c.player.name === p.name)
      ).slice(0, 5)
    : []

  function addPlayer(player: FootlePlayer) {
    const last = chain[chain.length - 1].player
    const club = findSharedClub(last, player)
    if (!club) {
      setError(`No known shared club between ${last.name} and ${player.name}`)
      setTimeout(() => setError(''), 3000)
      setQuery(''); return
    }
    const newChain: ChainLink[] = [...chain, { player, sharedClub: club }]
    setChain(newChain); setQuery('')
    if (player.name === puzzle.end.name) {
      setWon(true); setTimeout(() => setShowResult(true), 600)
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
        right={<span className="text-sm text-[#8B949E]">{steps}/{puzzle.maxSteps} steps</span>}
      />

      <div className="flex-1 flex flex-col px-4 py-4 gap-4 max-w-xl mx-auto w-full">

        {/* Goal card */}
        <div className="bg-[#161B22] border border-[#FF7B72]/30 rounded-2xl p-4">
          <p className="text-[#8B949E] text-xs text-center mb-3">Connect in ≤ {puzzle.maxSteps} steps</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 text-center">
              <PlayerAvatar name={puzzle.start.name} photo="" size={44} className="mx-auto mb-1.5" />
              <p className="text-white font-bold text-sm">{puzzle.start.name}</p>
              <p className="text-[#8B949E] text-xs">{getFlag(puzzle.start.nationality)} {puzzle.start.club}</p>
            </div>
            <div className="text-[#FF7B72] text-2xl">⛓️</div>
            <div className="flex-1 text-center">
              <PlayerAvatar name={puzzle.end.name} photo="" size={44} className="mx-auto mb-1.5" />
              <p className="text-white font-bold text-sm">{puzzle.end.name}</p>
              <p className="text-[#8B949E] text-xs">{getFlag(puzzle.end.nationality)} {puzzle.end.club}</p>
            </div>
          </div>
        </div>

        {/* Chain */}
        <div className="space-y-1">
          {chain.map((link, i) => (
            <div key={i}>
              {i > 0 && (
                <div className="flex items-center gap-2 py-1 px-2">
                  <div className="h-px flex-1 bg-[#30363D]"/>
                  <span className="text-[10px] text-[#8B949E] font-medium px-2 bg-[#161B22] rounded-full border border-[#30363D] py-0.5">
                    ⬆ {link.sharedClub}
                  </span>
                  <div className="h-px flex-1 bg-[#30363D]"/>
                </div>
              )}
              <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                link.player.name === puzzle.end.name && won
                  ? 'border-[#3FB950] bg-[#3FB950]/10'
                  : i === 0
                    ? 'border-[#FF7B72]/40 bg-[#FF7B72]/5'
                    : 'border-[#30363D] bg-[#161B22]'
              }`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i === 0 ? 'bg-[#FF7B72]/20 text-[#FF7B72]' :
                  link.player.name === puzzle.end.name && won ? 'bg-[#3FB950]/20 text-[#3FB950]' :
                  'bg-[#21262D] text-[#8B949E]'
                }`}>{i + 1}</div>
                <PlayerAvatar name={link.player.name} photo="" size={32} />
                <div>
                  <p className="text-white font-semibold text-sm">{link.player.name}</p>
                  <p className="text-[#8B949E] text-xs">{getFlag(link.player.nationality)} {link.player.club}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        {!over && (
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Add next player in chain…"
              className="w-full bg-[#161B22] border border-[#30363D] focus:border-[#FF7B72] rounded-2xl px-4 py-3.5 text-white text-sm outline-none transition-colors placeholder:text-[#8B949E]"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full mt-2 bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden shadow-2xl">
                {suggestions.map(p => (
                  <li key={p.name} className="border-b border-[#21262D] last:border-0">
                    <button
                      onClick={() => addPlayer(p)}
                      className="w-full text-left px-4 py-3 hover:bg-[#21262D] transition-colors flex items-center gap-3"
                    >
                      <PlayerAvatar name={p.name} photo="" size={28} />
                      <span className="text-white text-sm">{p.name}</span>
                      <span className="text-[#8B949E] text-xs ml-auto">{p.club}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400 text-center">
            {error}
          </div>
        )}
      </div>

      {showResult && (
        <GameResultModal
          won={won}
          title={won ? 'Chain complete! ⛓️' : 'Too many steps!'}
          message={won
            ? `Connected in ${steps} step${steps === 1 ? '' : 's'}!`
            : `Goal was ≤ ${puzzle.maxSteps} steps — you used ${steps}.`}
          shareText={`⛓️ Transfer Chain\n${puzzle.start.name} → ${puzzle.end.name}\n${won ? `✅ ${steps} steps` : '❌'}`}
          onPlayAgain={restart}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  )
}
