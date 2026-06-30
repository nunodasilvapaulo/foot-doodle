import { useState } from 'react'
import PageHeader from '../../shared/components/PageHeader'
import PlayerSearchField from '../../shared/components/PlayerSearchField'
import GameResultModal from '../../shared/components/GameResultModal'
import ClubLogo from '../../shared/components/ClubLogo'
import PlayerAvatar from '../../shared/components/PlayerAvatar'
import { getFlag } from '../../shared/utils/flags'
import { createGrid, placePlayer, isGameOver, type GridState, type ConstraintType } from './gridGame'
import type { Player } from '../../core/domain/types'

function constraintLabel(c: ConstraintType): string {
  if (c.kind === 'club') return c.club.name
  if (c.kind === 'nationality') return c.country
  return c.position
}

function ConstraintBadge({ c }: { c: ConstraintType }) {
  if (c.kind === 'club') {
    return (
      <div className="flex flex-col items-center gap-1">
        <ClubLogo name={c.club.name} logo={c.club.logo} size={28} />
        <span className="text-[10px] text-[#8B949E] text-center leading-tight line-clamp-2 max-w-[60px]">
          {c.club.name}
        </span>
      </div>
    )
  }
  if (c.kind === 'nationality') {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-xl leading-none">{getFlag(c.country)}</span>
        <span className="text-[10px] text-[#8B949E] text-center leading-tight">{c.country}</span>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-base">👕</span>
      <span className="text-[10px] text-[#8B949E]">{c.position}</span>
    </div>
  )
}

export default function GridPage() {
  const [puzzleIndex] = useState(() => Math.floor(Math.random() * 4))
  const [state, setState] = useState<GridState>(() => createGrid(puzzleIndex))
  const [active, setActive] = useState<[number, number] | null>(null)
  const [flash, setFlash] = useState<{ row: number; col: number; ok: boolean } | null>(null)
  const [showResult, setShowResult] = useState(false)
  const over = isGameOver(state)

  function handleSelect(player: Player) {
    if (!active || over) return
    const [r, c] = active
    if (state.cells[r][c].player) return
    const { state: next, valid } = placePlayer(state, r, c, player)
    setState(next)
    setFlash({ row: r, col: c, ok: valid })
    setActive(null)
    setTimeout(() => setFlash(null), 900)
    if (isGameOver(next)) setTimeout(() => setShowResult(true), 700)
  }

  function restart() {
    setState(createGrid(Math.floor(Math.random() * 4)))
    setActive(null); setShowResult(false)
  }

  const { puzzle, cells, guessesLeft, score } = state

  return (
    <div className="min-h-dvh flex flex-col bg-[#0D1117]">
      <PageHeader
        title="Grid"
        color="#F78166"
        right={
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < (9 - guessesLeft) ? 'bg-red-500' : 'bg-[#30363D]'}`} />
            ))}
          </div>
        }
      />

      <div className="flex-1 flex flex-col items-center px-3 py-3 gap-3 max-w-xl mx-auto w-full">
        {/* Score */}
        <p className="text-[#8B949E] text-sm">
          Score <span className="text-white font-bold text-base">{score}</span>
          <span className="text-[#30363D]">/9</span>
          <span className="ml-3 text-[#8B949E]">· {guessesLeft} guesses left</span>
        </p>

        {/* Grid */}
        <div className="w-full">
          {/* Column headers */}
          <div className="grid grid-cols-4 gap-1.5 mb-1.5">
            <div />
            {puzzle.colConstraints.map((cc, ci) => (
              <div key={ci} className="bg-[#161B22] border border-[#30363D] rounded-xl p-2 flex items-center justify-center min-h-[64px]">
                <ConstraintBadge c={cc} />
              </div>
            ))}
          </div>

          {/* Rows */}
          {cells.map((row, ri) => (
            <div key={ri} className="grid grid-cols-4 gap-1.5 mb-1.5">
              {/* Row header */}
              <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-2 flex items-center justify-center min-h-[72px]">
                <ConstraintBadge c={puzzle.rowConstraints[ri]} />
              </div>

              {/* Cells */}
              {row.map(cell => {
                const isActive = active?.[0] === ri && active?.[1] === cell.col
                const flashState = flash?.row === ri && flash?.col === cell.col ? flash.ok : null
                const filled = !!cell.player

                let borderCls = 'border-[#30363D]'
                if (flashState === true) borderCls = 'border-[#3FB950]'
                else if (flashState === false) borderCls = 'border-red-500'
                else if (filled) borderCls = 'border-[#3FB950]/60'
                else if (isActive) borderCls = 'border-[#F78166]'

                let bgCls = 'bg-[#161B22]'
                if (flashState === true) bgCls = 'bg-[#3FB950]/15'
                else if (flashState === false) bgCls = 'bg-red-900/20'
                else if (filled) bgCls = 'bg-[#3FB950]/8'
                else if (isActive) bgCls = 'bg-[#F78166]/10'

                return (
                  <button
                    key={cell.col}
                    disabled={filled || over}
                    onClick={() => setActive([ri, cell.col])}
                    className={`rounded-xl border-2 flex flex-col items-center justify-center p-1.5 transition-all min-h-[72px] ${borderCls} ${bgCls} ${!filled && !over ? 'hover:brightness-125 active:scale-95' : ''}`}
                  >
                    {filled ? (
                      <>
                        <PlayerAvatar name={cell.player!.name} photo={cell.player!.photo} size={32} />
                        <span className="text-[9px] text-white text-center leading-tight mt-1 line-clamp-2 px-0.5">
                          {cell.player!.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-[#30363D] text-2xl font-light">+</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Search */}
        {active && !over && (
          <div className="w-full space-y-2">
            <p className="text-xs text-center text-[#8B949E]">
              <span className="text-white font-medium">{constraintLabel(puzzle.rowConstraints[active[0]])}</span>
              {' '}×{' '}
              <span className="text-white font-medium">{constraintLabel(puzzle.colConstraints[active[1]])}</span>
            </p>
            <PlayerSearchField onSelect={handleSelect} placeholder="Search for a player…" />
          </div>
        )}
      </div>

      {showResult && (
        <GameResultModal
          won={score >= 6}
          title={score === 9 ? 'Perfect!' : score >= 6 ? 'Great Game!' : 'Game Over'}
          message={`You filled ${score} out of 9 cells.`}
          shareText={`⬛ Football Grid\n${score}/9 ⚽\nplay.foot-doodle.app`}
          onPlayAgain={restart}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  )
}
