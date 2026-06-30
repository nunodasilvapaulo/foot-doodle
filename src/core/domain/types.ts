export type Position = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker' | 'Unknown'

export interface Player {
  id: number
  name: string
  photo: string
  nationality: string
  age: number
  position: Position
  clubs: Club[]        // career clubs, most recent first
}

export interface Club {
  id: number
  name: string
  logo: string
  country: string
}

export interface Transfer {
  playerId: number
  playerName: string
  date: string
  type: string
  fromClub: Club
  toClub: Club
}

export function parsePosition(raw: string | null | undefined): Position {
  if (!raw) return 'Unknown'
  if (raw.toLowerCase().includes('goalkeeper') || raw === 'G') return 'Goalkeeper'
  if (raw.toLowerCase().includes('defender') || raw === 'D') return 'Defender'
  if (raw.toLowerCase().includes('midfielder') || raw === 'M') return 'Midfielder'
  if (raw.toLowerCase().includes('attacker') || raw === 'F') return 'Attacker'
  return 'Unknown'
}

export const WELL_KNOWN_CLUBS: Club[] = [
  { id: 541,  name: 'Real Madrid',       logo: 'https://media.api-sports.io/football/teams/541.png',  country: 'Spain' },
  { id: 529,  name: 'Barcelona',         logo: 'https://media.api-sports.io/football/teams/529.png',  country: 'Spain' },
  { id: 50,   name: 'Manchester City',   logo: 'https://media.api-sports.io/football/teams/50.png',   country: 'England' },
  { id: 33,   name: 'Manchester United', logo: 'https://media.api-sports.io/football/teams/33.png',   country: 'England' },
  { id: 40,   name: 'Liverpool',         logo: 'https://media.api-sports.io/football/teams/40.png',   country: 'England' },
  { id: 42,   name: 'Arsenal',           logo: 'https://media.api-sports.io/football/teams/42.png',   country: 'England' },
  { id: 49,   name: 'Chelsea',           logo: 'https://media.api-sports.io/football/teams/49.png',   country: 'England' },
  { id: 47,   name: 'Tottenham',         logo: 'https://media.api-sports.io/football/teams/47.png',   country: 'England' },
  { id: 157,  name: 'Bayern Munich',     logo: 'https://media.api-sports.io/football/teams/157.png',  country: 'Germany' },
  { id: 165,  name: 'Borussia Dortmund', logo: 'https://media.api-sports.io/football/teams/165.png',  country: 'Germany' },
  { id: 505,  name: 'Inter Milan',       logo: 'https://media.api-sports.io/football/teams/505.png',  country: 'Italy' },
  { id: 489,  name: 'AC Milan',          logo: 'https://media.api-sports.io/football/teams/489.png',  country: 'Italy' },
  { id: 496,  name: 'Juventus',          logo: 'https://media.api-sports.io/football/teams/496.png',  country: 'Italy' },
  { id: 85,   name: 'Paris SG',          logo: 'https://media.api-sports.io/football/teams/85.png',   country: 'France' },
  { id: 73,   name: 'Atletico Madrid',   logo: 'https://media.api-sports.io/football/teams/73.png',   country: 'Spain' },
]
