export interface APIResponse<T> {
  get: string
  parameters: Record<string, string>
  errors: string[]
  results: number
  paging: { current: number; total: number }
  response: T[]
}

export interface APIPlayer {
  id: number
  name: string
  firstname: string
  lastname: string
  age: number
  nationality: string
  height: string
  weight: string
  photo: string
  birth: { date: string; place: string; country: string }
}

export interface APIPlayerStatistics {
  team: { id: number; name: string; logo: string }
  league: { id: number; name: string; country: string; logo: string; season: number }
  games: { position: string; rating: string | null; appearances: number | null }
}

export interface APIPlayerResponse {
  player: APIPlayer
  statistics: APIPlayerStatistics[]
}

export interface APITeam {
  id: number
  name: string
  code: string
  country: string
  founded: number
  logo: string
}

export interface APITeamResponse {
  team: APITeam
  venue: { id: number; name: string; city: string }
}

export interface APITransfer {
  player: { id: number; name: string }
  update: string
  transfers: Array<{
    date: string
    type: string
    teams: {
      in: { id: number; name: string; logo: string }
      out: { id: number; name: string; logo: string }
    }
  }>
}
