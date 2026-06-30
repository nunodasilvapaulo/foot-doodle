import { useNavigate } from 'react-router-dom'
import ApiKeyGate from '../../shared/components/ApiKeyGate'

const GAMES = [
  {
    route: '/grid',
    emoji: '⬛',
    title: 'Grid',
    subtitle: 'Tiki-Taka-Toe',
    description: 'Find players matching two criteria',
    color: '#F78166',
    gradient: 'from-[#F78166]/20 to-[#F78166]/5',
    border: 'border-[#F78166]/30',
  },
  {
    route: '/footle',
    emoji: '🟩',
    title: 'Footle',
    subtitle: 'Wordle for Players',
    description: 'Guess the mystery player in 6 tries',
    color: '#3FB950',
    gradient: 'from-[#3FB950]/20 to-[#3FB950]/5',
    border: 'border-[#3FB950]/30',
  },
  {
    route: '/quiz',
    emoji: '❓',
    title: 'Quiz',
    subtitle: 'Trivia Challenge',
    description: '10 questions, 30 seconds each',
    color: '#D2A8FF',
    gradient: 'from-[#D2A8FF]/20 to-[#D2A8FF]/5',
    border: 'border-[#D2A8FF]/30',
  },
  {
    route: '/connections',
    emoji: '🔗',
    title: 'Connections',
    subtitle: 'Group Them',
    description: 'Find four groups of four items',
    color: '#FFA657',
    gradient: 'from-[#FFA657]/20 to-[#FFA657]/5',
    border: 'border-[#FFA657]/30',
  },
  {
    route: '/lineup',
    emoji: '📋',
    title: 'Lineup',
    subtitle: 'Guess the XI',
    description: 'Identify a famous starting eleven',
    color: '#58A6FF',
    gradient: 'from-[#58A6FF]/20 to-[#58A6FF]/5',
    border: 'border-[#58A6FF]/30',
  },
  {
    route: '/chain',
    emoji: '⛓️',
    title: 'Transfer Chain',
    subtitle: 'Six Degrees',
    description: 'Link two players through shared clubs',
    color: '#FF7B72',
    gradient: 'from-[#FF7B72]/20 to-[#FF7B72]/5',
    border: 'border-[#FF7B72]/30',
  },
] as const

export default function HubPage() {
  const nav = useNavigate()

  return (
    <ApiKeyGate>
      <div className="min-h-dvh flex flex-col bg-[#0D1117]">

        {/* Header */}
        <header className="px-5 pt-8 pb-6 text-center">
          <div className="text-5xl mb-3">⚽</div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Football Trivia</h1>
          <p className="text-[#8B949E] text-sm mt-1">Pick a game and test your knowledge</p>
        </header>

        {/* Game grid */}
        <main className="flex-1 px-4 pb-8">
          <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
            {GAMES.map(g => (
              <button
                key={g.route}
                onClick={() => nav(g.route)}
                className={`
                  relative text-left rounded-2xl border bg-gradient-to-br ${g.gradient} ${g.border}
                  p-4 active:scale-[0.96] transition-all duration-150
                  hover:brightness-110
                `}
              >
                {/* Accent dot */}
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: g.color }} />

                <div className="text-2xl mb-2">{g.emoji}</div>

                <p className="text-white font-bold text-base leading-tight">{g.title}</p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: g.color }}>{g.subtitle}</p>
                <p className="text-[#8B949E] text-xs mt-1.5 leading-snug">{g.description}</p>
              </button>
            ))}
          </div>
        </main>

      </div>
    </ApiKeyGate>
  )
}
