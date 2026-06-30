import { useState } from 'react'
import PageHeader from '../../shared/components/PageHeader'
import PlayerSearchField from '../../shared/components/PlayerSearchField'
import GameResultModal from '../../shared/components/GameResultModal'
import { createGrid, placePlayer, isGameOver, type GridState, type ConstraintType } from './gridGame'
import type { Player } from '../../core/domain/types'

function constraintLabel(c: ConstraintType): string {
  if (c.kind === 'club') return c.club.name
  if (c.kind === 'nationality') return c.country
  return c.position
}

function constraintIcon(c: ConstraintType): string {
  if (c.kind === 'club') return c.club.logo
  return ''
}

export default function GridPage() {
  const [puzzleIndex] = useState(() => Math.floor(Math.random() * 4))
  const [state, setState] = useState<GridState>(() => createGrid(puzzleIndex))
  const [active, setActive] = useState<[number, number] | null>(null)
  const [lastResult, setLastResult] = useState<'valid' | 'invalid' | null>(null)
  const [showResult, setShowResult] = useState(false)
  const over = isGameOver(state)

  function handleSelect(player: Player) {
    if (!active || over) return
    const [r, c] = active
    if (state.cells[r][c].player) return

    const { state: next, valid } = placePlayer(state, r, c, player)
    setState(next)
    setLastResult(valid ? 'valid' : 'invalid')
    setActive(null)
    setTimeout(() => setLastResult(null), 800)

    if (isGameOver(next)) setTimeout(() => setShowResult(true), 600)
  }

  function restart() {
    setState(createGrid(Math.floor(Math.random() * 4)))
    setActive(null)
    setShowResult(false)
  }

  const { puzzle, cells, guessesLeft, score } = state

  return (
    <div className="min-h-dvh flex flex-col bg-[#0D1117]">
      <PageHeader
        title="Grid"
        color="#F78166"
        right={
          <div className="text-right">
            <p className="text-xs text-[#8B949E]">Guesses</p>
            <p className="text-sm font-bold text-white">{guessesLeft}</p>
          </div>
        }
      />

      <div className="flex-1 flex flex-col items-center px-4 py-4 gap-4">
        {/* Score */}
        <p className="text-[#8B949E] text-sm">
          Score: <span className="text-white font-semibold">{score}/9</span>
        </p>

        {/* Grid */}
        <div className="w-full max-w-lg">
          {/* Column headers */}
          <div className="grid grid-cols-4 gap-1 mb-1">
            <div /> {/* empty corner */}
            {puzzle.colConstraints.map((cc, ci) => (
              <div key={ci} className="flex flex-col items-center gap-1 p-2">
                {constraintIcon(cc) && (
                  <img src={constraintIcon(cc)} alt="" className="w-7 h-7 object-contain" />
                )}
                <span className="text-xs text-[#8B949E] text-center leading-tight">{constraintLabel(cc)}</span>
              </div>
            ))}
          </div>

          {/* Rows */}
          {cells.map((row, ri) => (
            <div key={ri} className="grid grid-cols-4 gap-1 mb-1">
              {/* Row header */}
              <div className="flex flex-col items-center justify-center gap-1 p-2">
                {constraintIcon(puzzle.rowConstraints[ri]) && (
                  <img src={constraintIcon(puzzle.rowConstraints[ri])} alt="" className="w-7 h-7 object-contain" />
                )}
                <span className="text-xs text-[#8B949E] text-center leading-tight">
                  {constraintLabel(puzzle.rowConstraints[ri])}
                </span>
              </div>

              {/* Cells */}
              {row.map(cell => {
                const isActive = active?.[0] === ri && active?.[1] === cell.col
                const filled = !!cell.player
                return (
                  <button
                    key={cell.col}
                    disabled={filled || over}
                    onClick={() => setActive([ri, cell.col])}
                    className={`
                      aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-1 transition-all
                      ${filled
                        ? 'border-[#3FB950] bg-[#3FB950]/10'
                        : isActive
                          ? 'border-[#F78166] bg-[#F78166]/10'
                          : 'border-[#30363D] bg-[#161B22] hover:border-[#8B949E]'
                      }
                    `}
                  >
                    {filled ? (
                      <>
                        <img src={cell.player!.photo} alt="" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-[10px] text-white text-center leading-tight mt-1 line-clamp-2">
                          {cell.player!.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl text-[#30363D]">+</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Search */}
        {active && !over && (
          <div className="w-full max-w-lg">
            <p className="text-[#8B949E] text-xs mb-2 text-center">
              Searching for row <strong className="text-white">{constraintLabel(puzzle.rowConstraints[active[0]])}</strong>
              {' '}× col <strong className="text-white">{constraintLabel(puzzle.colConstraints[active[1]])}</strong>
            </p>
            <PlayerSearchField onSelect={handleSelect} placeholder="Search for a player…" />
          </div>
        )}

        {lastResult === 'invalid' && (
          <p className="text-red-400 text-sm animate-pulse">That player doesn't match — guess lost!</p>
        )}
        {lastResult === 'valid' && (
          <p className="text-[#3FB950] text-sm">Correct!</p>
        )}
      </div>

      {showResult && (
        <GameResultModal
          won={score >= 6}
          title={score === 9 ? 'Perfect!' : score >= 6 ? 'Great Game!' : 'Game Over'}
          message={`You filled ${score} out of 9 cells.`}
          shareText={`⬛ Football Grid\n${score}/9 ⚽\n\nPlay at Football Trivia PWA`}
          onPlayAgain={restart}
          onClose={() => setShowResult(false)}
        />
      )}
    </div>
  )
}
