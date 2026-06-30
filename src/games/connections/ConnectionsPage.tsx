import { useState } from 'react'
import PageHeader from '../../shared/components/PageHeader'
import GameResultModal from '../../shared/components/GameResultModal'
import { PUZZLES } from '../../data/connections'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }; return a
}

export default function ConnectionsPage() {
  const [puzzleIdx] = useState(() => Math.floor(Math.random() * PUZZLES.length))
  const puzzle = PUZZLES[puzzleIdx]

  // Build flat item list with category info
  const allItems = shuffle(
    puzzle.categories.flatMap(cat => cat.items.map(item => ({ item, catLabel: cat.label, catColor: cat.color })))
  )

  const [items, setItems] = useState(allItems)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [solved, setSolved] = useState<string[]>([])   // solved category labels
  const [mistakes, setMistakes] = useState(0)
  const [shake, setShake] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const MAX_MISTAKES = 4
  const over = mistakes >= MAX_MISTAKES || solved.length === puzzle.categories.length

  function toggle(item: string) {
    if (over) return
    setSelected(prev => {
      const s = new Set(prev)
      if (s.has(item)) { s.delete(item); return s }
      if (s.size >= 4) return prev
      s.add(item)
      return s
    })
  }

  function submit() {
    if (selected.size !== 4 || over) return
    const selectedItems = [...selected]

    // Check if all 4 belong to the same category
    const cat = puzzle.categories.find(c => selectedItems.every(i => c.items.includes(i)))
    if (cat) {
      setSolved(prev => {
        const next = [...prev, cat.label]
        if (next.length === puzzle.categories.length) setTimeout(() => setShowResult(true), 600)
        return next
      })
      setItems(prev => prev.filter(i => !selected.has(i.item)))
      setSelected(new Set())
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 600)
      setMistakes(m => {
        const next = m + 1
        if (next >= MAX_MISTAKES) setTimeout(() => setShowResult(true), 600)
        return next
      })
      setSelected(new Set())
    }
  }

  function restart() {
    const reshuffled = shuffle(
      puzzle.categories.flatMap(cat => cat.items.map(item => ({ item, catLabel: cat.label, catColor: cat.color })))
    )
    setItems(reshuffled); setSolved([]); setMistakes(0); setSelected(new Set()); setShowResult(false)
  }

  const won = solved.length === puzzle.categories.length

  return (
    <div className="min-h-dvh flex flex-col bg-[#0D1117]">
      <PageHeader
        title="Connections"
        color="#FFA657"
        right={
          <div className="flex gap-1">
            {Array.from({ length: MAX_MISTAKES }, (_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i < mistakes ? 'bg-red-500' : 'bg-[#30363D]'}`} />
            ))}
          </div>
        }
      />

      <div className="flex-1 flex flex-col items-center px-4 py-4 gap-4 max-w-xl mx-auto w-full">
        <p className="text-[#8B949E] text-sm text-center">{puzzle.title}</p>

        {/* Solved categories */}
        {solved.map(label => {
          const cat = puzzle.categories.find(c => c.label === label)!
          return (
            <div key={label} className="w-full rounded-xl p-4 text-center" style={{ background: `${cat.color}25`, borderLeft: `4px solid ${cat.color}` }}>
              <p className="text-white font-bold text-sm">{cat.label}</p>
              <p className="text-[#8B949E] text-xs mt-1">{cat.items.join(', ')}</p>
            </div>
          )
        })}

        {/* Item grid */}
        <div className={`grid grid-cols-4 gap-2 w-full ${shake ? 'animate-[shake_0.5s]' : ''}`}>
          {items.map(({ item, catColor }) => {
            const isSelected = selected.has(item)
            return (
              <button
                key={item}
                onClick={() => toggle(item)}
                className={`
                  rounded-xl p-3 text-center border-2 transition-all active:scale-95 text-xs font-semibold leading-tight
                  ${isSelected
                    ? 'text-white scale-105'
                    : 'border-[#30363D] bg-[#161B22] text-[#E6EDF3]'
                  }
                `}
                style={isSelected ? { background: `${catColor}30`, borderColor: catColor, color: 'white' } : {}}
              >
                {item}
              </button>
            )
          })}
        </div>

        {/* Submit */}
        {!over && (
          <button
            onClick={submit}
            disabled={selected.size !== 4}
            className="px-8 py-3 bg-[#FFA657] disabled:bg-[#30363D] disabled:text-[#8B949E] text-black font-bold rounded-xl transition-all active:scale-95"
          >
            Submit ({selected.size}/4)
          </button>
        )}

        <p className="text-[#8B949E] text-sm">
          {mistakes} mistake{mistakes !== 1 ? 's' : ''} · {solved.length}/{puzzle.categories.length} solved
        </p>
      </div>

      {showResult && (
        <GameResultModal
          won={won}
          title={won ? 'Connected!' : 'Game Over'}
          message={won ? 'You found all four groups!' : `${solved.length}/${puzzle.categories.length} groups found.`}
          shareText={`🔗 Connections\n${solved.length}/${puzzle.categories.length} groups\n${mistakes} mistake${mistakes !== 1 ? 's' : ''}`}
          onPlayAgain={restart}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  )
}
