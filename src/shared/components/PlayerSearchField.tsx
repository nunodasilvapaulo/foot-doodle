import { useState, useEffect, useRef } from 'react'
import { Search, Loader } from 'lucide-react'
import { searchPlayers } from '../../core/repository/footballRepository'
import type { Player } from '../../core/domain/types'

interface Props {
  onSelect: (player: Player) => void
  placeholder?: string
  disabled?: boolean
}

export default function PlayerSearchField({ onSelect, placeholder = 'Search player…', disabled }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Player[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    clearTimeout(timer.current)
    if (query.length < 3) { setResults([]); setOpen(false); return }

    timer.current = setTimeout(async () => {
      setLoading(true); setError('')
      try {
        const players = await searchPlayers(query)
        setResults(players)
        setOpen(true)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Search failed')
      } finally {
        setLoading(false)
      }
    }, 400)
  }, [query])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function select(p: Player) {
    onSelect(p)
    setQuery('')
    setResults([])
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center gap-2 bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3">
        {loading ? <Loader size={16} className="text-[#8B949E] animate-spin shrink-0" /> : <Search size={16} className="text-[#8B949E] shrink-0" />}
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-[#8B949E] disabled:opacity-50"
        />
      </div>

      {error && <p className="text-red-400 text-xs mt-1 px-1">{error}</p>}

      {open && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden shadow-2xl max-h-72 overflow-y-auto">
          {results.map(p => (
            <li key={p.id}>
              <button
                onClick={() => select(p)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#21262D] active:bg-[#30363D] transition-colors text-left"
              >
                <img src={p.photo} alt="" className="w-8 h-8 rounded-full object-cover bg-[#21262D]" loading="lazy" />
                <div>
                  <p className="text-white text-sm font-medium">{p.name}</p>
                  <p className="text-[#8B949E] text-xs">{p.nationality} · {p.position}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && results.length === 0 && !loading && (
        <div className="absolute z-50 w-full mt-1 bg-[#161B22] border border-[#30363D] rounded-xl px-4 py-3">
          <p className="text-[#8B949E] text-sm">No players found</p>
        </div>
      )}
    </div>
  )
}
