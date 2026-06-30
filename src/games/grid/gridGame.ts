import type { Player, Club } from '../../core/domain/types'
import { WELL_KNOWN_CLUBS } from '../../core/domain/types'

export type ConstraintType =
  | { kind: 'club'; club: Club }
  | { kind: 'nationality'; country: string }
  | { kind: 'position'; position: string }

export interface GridPuzzle {
  rowConstraints: [ConstraintType, ConstraintType, ConstraintType]
  colConstraints: [ConstraintType, ConstraintType, ConstraintType]
}

export interface GridCell {
  row: number
  col: number
  player: Player | null
}

export interface GridState {
  puzzle: GridPuzzle
  cells: GridCell[][]  // 3x3
  guessesLeft: number
  score: number
}

export function playerMatchesConstraint(player: Player, c: ConstraintType): boolean {
  if (c.kind === 'club') return player.clubs.some(cl => cl.id === c.club.id)
  if (c.kind === 'nationality') return player.nationality.toLowerCase() === c.country.toLowerCase()
  if (c.kind === 'position') return player.position.toLowerCase() === c.position.toLowerCase()
  return false
}

export function playerMatchesCell(player: Player, row: number, col: number, puzzle: GridPuzzle): boolean {
  return playerMatchesConstraint(player, puzzle.rowConstraints[row]) &&
         playerMatchesConstraint(player, puzzle.colConstraints[col])
}

function club(c: Club): ConstraintType { return { kind: 'club', club: c } }
function nat(country: string): ConstraintType { return { kind: 'nationality', country } }
// pos is available for future puzzle use
export function pos(position: string): ConstraintType { return { kind: 'position', position } }

const C = Object.fromEntries(WELL_KNOWN_CLUBS.map(c => [c.name.replace(/\s/g, ''), c]))

export const PUZZLES: GridPuzzle[] = [
  {
    rowConstraints: [club(C['RealMadrid']), club(C['Barcelona']), nat('Spain')],
    colConstraints: [nat('Brazil'), nat('France'), club(C['ManchesterCity'])],
  },
  {
    rowConstraints: [club(C['Liverpool']), club(C['Arsenal']), club(C['Chelsea'])],
    colConstraints: [nat('England'), nat('Germany'), club(C['BayernMunich'])],
  },
  {
    rowConstraints: [club(C['Juventus']), club(C['ACMilan']), club(C['InterMilan'])],
    colConstraints: [nat('Italy'), nat('Argentina'), nat('Brazil')],
  },
  {
    rowConstraints: [club(C['ManchesterUnited']), club(C['Tottenham']), nat('Portugal')],
    colConstraints: [club(C['RealMadrid']), nat('England'), nat('France')],
  },
]

export function createGrid(puzzleIndex: number): GridState {
  const puzzle = PUZZLES[puzzleIndex % PUZZLES.length]
  const cells: GridCell[][] = Array.from({ length: 3 }, (_, r) =>
    Array.from({ length: 3 }, (_, c) => ({ row: r, col: c, player: null }))
  )
  return { puzzle, cells, guessesLeft: 9, score: 0 }
}

export function placePlayer(state: GridState, row: number, col: number, player: Player): { state: GridState; valid: boolean } {
  if (!playerMatchesCell(player, row, col, state.puzzle)) {
    return { state: { ...state, guessesLeft: state.guessesLeft - 1 }, valid: false }
  }
  const cells = state.cells.map(r => r.map(c => ({ ...c })))
  cells[row][col] = { ...cells[row][col], player }
  const filled = cells.flat().filter(c => c.player !== null).length
  return {
    state: { ...state, cells, guessesLeft: state.guessesLeft - 1, score: filled },
    valid: true,
  }
}

export function isGameOver(state: GridState): boolean {
  const allFilled = state.cells.flat().every(c => c.player !== null)
  return allFilled || state.guessesLeft <= 0
}
