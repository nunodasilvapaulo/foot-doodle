import { useNavigate } from 'react-router-dom'
import ApiKeyGate from '../../shared/components/ApiKeyGate'

const GAMES = [
  {
    route: '/grid',
    emoji: '⬛',
    title: 'Grid',
    subtitle: 'Tiki-Taka-Toe',
    description: 'Find players that match two intersecting criteria',
    color: '#F78166',
    bg: 'rgba(247,129,102,0.1)',
  },
  {
    route: '/footle',
    emoji: '🟩',
    title: 'Footle',
    subtitle: 'Wordle for Players',
    description: 'Guess the mystery player in 6 attempts',
    color: '#3FB950',
    bg: 'rgba(63,185,80,0.1)',
  },
  {
    route: '/quiz',
    emoji: '❓',
    title: 'Quiz',
    subtitle: 'Trivia Challenge',
    description: '20 questions, 30 seconds each — beat the clock',
    color: '#D2A8FF',
    bg: 'rgba(210,168,255,0.1)',
  },
  {
    route: '/connections',
    emoji: '🔗',
    title: 'Connections',
    subtitle: 'Group Them',
    description: 'Find four groups of four related football items',
    color: '#FFA657',
    bg: 'rgba(255,166,87,0.1)',
  },
  {
    route: '/lineup',
    emoji: '📋',
    title: 'Lineup Builder',
    subtitle: 'Guess the XI',
    description: 'Identify every player in a famous starting eleven',
    color: '#58A6FF',
    bg: 'rgba(88,166,255,0.1)',
  },
  {
    route: '/chain',
    emoji: '⛓️',
    title: 'Transfer Chain',
    subtitle: 'Six Degrees',
    description: 'Link two players through shared clubs',
    color: '#FF7B72',
    bg: 'rgba(255,123,114,0.1)',
  },
] as const

export default function HubPage() {
  const nav = useNavigate()

  return (
    <ApiKeyGate>
      <div className="min-h-dvh flex flex-col bg-[#0D1117]">
        {/* Header */}
        <header className="px-5 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-white">Football Trivia</h1>
          <p className="text-[#8B949E] text-sm mt-0.5">Choose a game to play</p>
        </header>

        {/* Game Grid */}
        <main className="flex-1 px-4 pb-6">
          <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto sm:grid-cols-2">
            {GAMES.map(g => (
              <button
                key={g.route}
                onClick={() => nav(g.route)}
                className="text-left rounded-2xl border border-[#30363D] p-5 hover:border-opacity-80 active:scale-[0.97] transition-all"
                style={{ background: g.bg, borderColor: `${g.color}40` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl leading-none">{g.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-base font-bold text-white">{g.title}</h2>
                      <span className="text-xs font-medium" style={{ color: g.color }}>{g.subtitle}</span>
                    </div>
                    <p className="text-[#8B949E] text-sm mt-1 leading-snug">{g.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>
    </ApiKeyGate>
  )
}
