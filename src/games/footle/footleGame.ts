export type HintStatus = 'correct' | 'close' | 'wrong'

export interface PlayerHint {
  name: HintStatus
  nationality: HintStatus
  position: HintStatus
  age: HintStatus
  ageDirection: 'higher' | 'lower' | null  // target is higher/lower than guess
  club: HintStatus
}

export interface FootleGuess {
  player: FootlePlayer
  hints: PlayerHint
}

export interface FootlePlayer {
  name: string
  nationality: string
  position: string
  age: number
  club: string
}

// Pool of well-known players (offline, no API needed)
export const PLAYER_POOL: FootlePlayer[] = [
  { name: 'Lionel Messi',       nationality: 'Argentina', position: 'Attacker',   age: 36, club: 'Inter Miami' },
  { name: 'Cristiano Ronaldo',  nationality: 'Portugal',  position: 'Attacker',   age: 39, club: 'Al Nassr' },
  { name: 'Kylian Mbappé',      nationality: 'France',    position: 'Attacker',   age: 25, club: 'Real Madrid' },
  { name: 'Erling Haaland',     nationality: 'Norway',    position: 'Attacker',   age: 23, club: 'Manchester City' },
  { name: 'Vinicius Jr',        nationality: 'Brazil',    position: 'Attacker',   age: 23, club: 'Real Madrid' },
  { name: 'Lamine Yamal',       nationality: 'Spain',     position: 'Attacker',   age: 17, club: 'Barcelona' },
  { name: 'Mohamed Salah',      nationality: 'Egypt',     position: 'Attacker',   age: 31, club: 'Liverpool' },
  { name: 'Kevin De Bruyne',    nationality: 'Belgium',   position: 'Midfielder', age: 32, club: 'Manchester City' },
  { name: 'Pedri',              nationality: 'Spain',     position: 'Midfielder', age: 21, club: 'Barcelona' },
  { name: 'Jude Bellingham',    nationality: 'England',   position: 'Midfielder', age: 20, club: 'Real Madrid' },
  { name: 'Rodri',              nationality: 'Spain',     position: 'Midfielder', age: 27, club: 'Manchester City' },
  { name: 'Frenkie de Jong',    nationality: 'Netherlands', position: 'Midfielder', age: 26, club: 'Barcelona' },
  { name: 'Virgil van Dijk',    nationality: 'Netherlands', position: 'Defender', age: 32, club: 'Liverpool' },
  { name: 'Ruben Dias',         nationality: 'Portugal',  position: 'Defender',   age: 26, club: 'Manchester City' },
  { name: 'Trent Alexander-Arnold', nationality: 'England', position: 'Defender', age: 25, club: 'Liverpool' },
  { name: 'Alphonso Davies',    nationality: 'Canada',    position: 'Defender',   age: 23, club: 'Bayern Munich' },
  { name: 'Alisson',            nationality: 'Brazil',    position: 'Goalkeeper', age: 31, club: 'Liverpool' },
  { name: 'Thibaut Courtois',   nationality: 'Belgium',   position: 'Goalkeeper', age: 31, club: 'Real Madrid' },
  { name: 'Harry Kane',         nationality: 'England',   position: 'Attacker',   age: 30, club: 'Bayern Munich' },
  { name: 'Antoine Griezmann',  nationality: 'France',    position: 'Attacker',   age: 32, club: 'Atletico Madrid' },
  { name: 'Neymar Jr',          nationality: 'Brazil',    position: 'Attacker',   age: 32, club: 'Al Hilal' },
  { name: 'Son Heung-min',      nationality: 'South Korea', position: 'Attacker', age: 31, club: 'Tottenham' },
  { name: 'Bruno Fernandes',    nationality: 'Portugal',  position: 'Midfielder', age: 29, club: 'Manchester United' },
  { name: 'Phil Foden',         nationality: 'England',   position: 'Midfielder', age: 23, club: 'Manchester City' },
  { name: 'Jamal Musiala',      nationality: 'Germany',   position: 'Midfielder', age: 21, club: 'Bayern Munich' },
]

export interface FootleState {
  target: FootlePlayer
  guesses: FootleGuess[]
  status: 'playing' | 'won' | 'lost'
}

function normalize(s: string) { return s.toLowerCase().trim() }

export function makeHints(guess: FootlePlayer, target: FootlePlayer): PlayerHint {
  const ageDiff = Math.abs(guess.age - target.age)
  return {
    name: normalize(guess.name) === normalize(target.name) ? 'correct' : 'wrong',
    nationality: normalize(guess.nationality) === normalize(target.nationality) ? 'correct' : 'wrong',
    position: normalize(guess.position) === normalize(target.position) ? 'correct' : 'wrong',
    age: guess.age === target.age ? 'correct' : ageDiff <= 3 ? 'close' : 'wrong',
    ageDirection: guess.age === target.age ? null : target.age > guess.age ? 'higher' : 'lower',
    club: normalize(guess.club) === normalize(target.club)
      ? 'correct'
      : guess.club.split(' ').some(w => target.club.includes(w)) ? 'close' : 'wrong',
  }
}

export function createFootle(): FootleState {
  const target = PLAYER_POOL[Math.floor(Math.random() * PLAYER_POOL.length)]
  return { target, guesses: [], status: 'playing' }
}

export function submitGuess(state: FootleState, guess: FootlePlayer): FootleState {
  const hints = makeHints(guess, state.target)
  const guesses = [...state.guesses, { player: guess, hints }]
  const won = hints.name === 'correct'
  const lost = !won && guesses.length >= 6
  return { ...state, guesses, status: won ? 'won' : lost ? 'lost' : 'playing' }
}
