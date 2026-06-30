import { useState } from 'react'
import PageHeader from '../../shared/components/PageHeader'
import GameResultModal from '../../shared/components/GameResultModal'
import { PUZZLES } from '../../data/connections'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const MAX_MISTAKES = 4

export default function ConnectionsPage() {
  const [puzzleIdx] = useState(() => Math.floor(Math.random() * PUZZLES.length))
  const puzzle = PUZZLES[puzzleIdx]

  const allItems = shuffle(
    puzzle.categories.flatMap(cat => cat.items.map(item => ({ item, catLabel: cat.label, catColor: cat.color })))
  )

  const [items, setItems] = useState(allItems)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState<string[]>([])
  const [mistakes, setMistakes] = useState(0)
  const [shake, setShake] = useState(false)
  const [lastWrong, setLastWrong] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const over = mistakes >= MAX_MISTAKES || solved.length === puzzle.categories.length

  function toggle(item: string) {
    if (over) return
    setSelected(prev => {
      const s = new Set(prev)
      if (s.has(item)) { s.delete(item); return s }
      if (s.size >= 4) return prev
      s.add(item); return s
    })
  }

  function submit() {
    if (selected.size !== 4 || over) return
    const sel = [...selected]
    const cat = puzzle.categories.find(c => sel.every(i => c.items.includes(i)))
    if (cat) {
      const next = [...solved, cat.label]
      setSolved(next)
      setItems(prev => prev.filter(i => !selected.has(i.item)))
      setSelected(new Set())
      if (next.length === puzzle.categories.length) setTimeout(() => setShowResult(true), 500)
    } else {
      setLastWrong(sel)
      setShake(true); setTimeout(() => { setShake(false); setLastWrong([]) }, 700)
      const next = mistakes + 1
      setMistakes(next)
      setSelected(new Set())
      if (next >= MAX_MISTAKES) setTimeout(() => setShowResult(true), 700)
    }
  }

  function restart() {
    const r = shuffle(puzzle.categories.flatMap(cat => cat.items.map(item => ({ item, catLabel: cat.label, catColor: cat.color }))))
    setItems(r); setSolved([]); setMistakes(0); setSelected(new Set()); setLastWrong([]); setShowResult(false)
  }

  const won = solved.length === puzzle.categories.length

  return (
    <div className="min-h-dvh flex flex-col bg-[#0D1117]">
      <PageHeader
        title="Connections"
        color="#FFA657"
        right={
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8B949E]">{mistakes}/{MAX_MISTAKES} mistakes</span>
            <div className="flex gap-1">
              {Array.from({ length: MAX_MISTAKES }, (_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i < mistakes ? 'bg-red-500' : 'bg-[#30363D]'}`} />
              ))}
            </div>
          </div>
        }
      />

      <div className="flex-1 flex flex-col items-center px-4 py-4 gap-4 max-w-xl mx-auto w-full">
        <p className="text-[#8B949E] text-sm text-center">{puzzle.title}</p>
        <p className="text-xs text-[#8B949E] -mt-2">Select 4 items that share a hidden connection</p>

        {/* Solved banners */}
        <div className="w-full space-y-2">
          {solved.map(label => {
            const cat = puzzle.categories.find(c => c.label === label)!
            return (
              <div
                key={label}
                className="w-full rounded-2xl p-4"
                style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}50` }}
              >
                <p className="text-white font-bold text-sm">{cat.label}</p>
                <p className="text-[#8B949E] text-xs mt-1">{cat.items.join(' · ')}</p>
              </div>
            )
          })}
        </div>

        {/* Remaining items */}
        <div
          className={`grid grid-cols-4 gap-2 w-full transition-transform ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
          style={{ '--shake': shake ? '1' : '0' } as React.CSSProperties}
        >
          {items.map(({ item, catColor }) => {
            const isSelected = selected.has(item)
            const wasWrong = lastWrong.includes(item)
            return (
              <button
                key={item}
                onClick={() => toggle(item)}
                className={`
                  rounded-2xl border-2 p-3 text-center text-xs font-bold leading-snug
                  min-h-[64px] flex items-center justify-center
                  transition-all duration-150 active:scale-95
                  ${wasWrong
                    ? 'border-red-500 bg-red-900/30 text-red-400 scale-95'
                    : isSelected
                      ? 'text-white scale-105 shadow-lg'
                      : 'border-[#30363D] bg-[#161B22] text-[#E6EDF3] hover:bg-[#21262D]'
                  }
                `}
                style={isSelected && !wasWrong
                  ? { background: `${catColor}25`, borderColor: catColor }
                  : {}
                }
              >
                {item}
              </button>
            )
          })}
        </div>

        {/* Submit */}
        {!over && items.length > 0 && (
          <button
            onClick={submit}
            disabled={selected.size !== 4}
            className="px-10 py-3.5 font-bold rounded-2xl text-sm transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={selected.size === 4
              ? { background: '#FFA657', color: '#0D1117' }
              : { background: '#21262D', color: '#8B949E' }
            }
          >
            Submit ({selected.size} / 4)
          </button>
        )}
      </div>

      {showResult && (
        <GameResultModal
          won={won}
          title={won ? 'All connected!' : 'Game Over'}
          message={won ? 'You found all four groups!' : `${solved.length}/${puzzle.categories.length} groups found.`}
          shareText={`🔗 Connections\n${solved.length}/${puzzle.categories.length} · ${mistakes} mistake${mistakes !== 1 ? 's' : ''}`}
          onPlayAgain={restart}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  )
}
