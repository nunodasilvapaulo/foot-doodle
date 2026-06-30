import { useState, useEffect, useRef } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { searchPlayers } from '../../core/repository/footballRepository'
import type { Player } from '../../core/domain/types'
import PlayerAvatar from './PlayerAvatar'
import { getFlag } from '../utils/flags'

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
    if (query.length < 2) { setResults([]); setOpen(false); return }
    timer.current = setTimeout(async () => {
      setLoading(true); setError('')
      try {
        const players = await searchPlayers(query)
        setResults(players); setOpen(true)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Search failed')
      } finally { setLoading(false) }
    }, 350)
  }, [query])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  function select(p: Player) {
    onSelect(p); setQuery(''); setResults([]); setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className={`flex items-center gap-3 bg-[#161B22] border rounded-2xl px-4 py-3.5 transition-colors ${open ? 'border-[#58A6FF]' : 'border-[#30363D]'}`}>
        {loading
          ? <Loader2 size={17} className="text-[#8B949E] animate-spin shrink-0" />
          : <Search size={17} className="text-[#8B949E] shrink-0" />
        }
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-[#8B949E] disabled:opacity-40"
        />
      </div>

      {error && <p className="text-red-400 text-xs mt-1.5 px-1">{error}</p>}

      {open && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden shadow-2xl max-h-72 overflow-y-auto">
          {results.map(p => (
            <li key={p.id} className="border-b border-[#21262D] last:border-0">
              <button
                onClick={() => select(p)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#21262D] active:bg-[#30363D] transition-colors text-left"
              >
                <PlayerAvatar name={p.name} photo={p.photo} size={36} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{p.name}</p>
                  <p className="text-[#8B949E] text-xs mt-0.5">
                    {getFlag(p.nationality)} {p.nationality} · {p.position}
                  </p>
                </div>
                {p.clubs[0] && (
                  <span className="text-[#8B949E] text-xs truncate max-w-[80px] text-right">
                    {p.clubs[0].name}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && results.length === 0 && !loading && (
        <div className="absolute z-50 w-full mt-2 bg-[#161B22] border border-[#30363D] rounded-2xl px-4 py-4 text-center">
          <p className="text-[#8B949E] text-sm">No players found for "{query}"</p>
        </div>
      )}
    </div>
  )
}
