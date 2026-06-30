import { supabase } from '../supabase/client'
import type { Player, Club } from '../domain/types'

// ── Types returned by the Supabase view ─────────────────────────────────────
interface PlayerRow {
  id: number
  name: string
  photo: string
  nationality: string
  age: number
  position: string
  clubs: { id: number; name: string; logo: string; country: string }[]
}

// ── Simple in-memory cache (survives HMR, clears on hard reload) ─────────────
const MEM: Map<string, { data: unknown; exp: number }> = new Map()

function memGet<T>(key: string): T | null {
  const e = MEM.get(key)
  if (!e || e.exp < Date.now()) { MEM.delete(key); return null }
  return e.data as T
}

function memSet<T>(key: string, data: T, ttlMs: number) {
  MEM.set(key, { data, exp: Date.now() + ttlMs })
}

// ── Converter ────────────────────────────────────────────────────────────────
function toPlayer(row: PlayerRow): Player {
  return {
    id: row.id,
    name: row.name,
    photo: row.photo,
    nationality: row.nationality,
    age: row.age,
    position: row.position as Player['position'],
    clubs: (row.clubs ?? []).map((c): Club => ({
      id: c.id,
      name: c.name,
      logo: c.logo,
      country: c.country,
    })),
  }
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Fast prefix search on player name using Postgres trigram index.
 * Returns up to 12 results.
 */
export async function searchPlayers(query: string): Promise<Player[]> {
  if (query.length < 2) return []

  const cacheKey = `search_${query.toLowerCase()}`
  const cached = memGet<Player[]>(cacheKey)
  if (cached) return cached

  const { data, error } = await supabase
    .from('player_with_clubs')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('name')
    .limit(12)

  if (error) throw new Error(error.message)

  const players = (data as PlayerRow[]).map(toPlayer)
  memSet(cacheKey, players, 60 * 60 * 1000) // 1 hour
  return players
}

/**
 * Fetch all players that ever played for a given club.
 */
export async function getPlayersByClub(clubId: number): Promise<Player[]> {
  const cacheKey = `club_${clubId}`
  const cached = memGet<Player[]>(cacheKey)
  if (cached) return cached

  const { data, error } = await supabase
    .from('player_with_clubs')
    .select('*')
    .contains('clubs', JSON.stringify([{ id: clubId }]))  // JSON containment
    .limit(100)

  if (error) throw new Error(error.message)

  const players = (data as PlayerRow[]).map(toPlayer)
  memSet(cacheKey, players, 24 * 60 * 60 * 1000)
  return players
}

/**
 * Fetch all players of a given nationality.
 */
export async function getPlayersByNationality(nationality: string): Promise<Player[]> {
  const cacheKey = `nat_${nationality.toLowerCase()}`
  const cached = memGet<Player[]>(cacheKey)
  if (cached) return cached

  const { data, error } = await supabase
    .from('player_with_clubs')
    .select('*')
    .ilike('nationality', nationality)
    .limit(100)

  if (error) throw new Error(error.message)

  const players = (data as PlayerRow[]).map(toPlayer)
  memSet(cacheKey, players, 24 * 60 * 60 * 1000)
  return players
}

/**
 * Fetch all players at a given position.
 */
export async function getPlayersByPosition(position: string): Promise<Player[]> {
  const cacheKey = `pos_${position.toLowerCase()}`
  const cached = memGet<Player[]>(cacheKey)
  if (cached) return cached

  const { data, error } = await supabase
    .from('player_with_clubs')
    .select('*')
    .eq('position', position)
    .limit(100)

  if (error) throw new Error(error.message)

  const players = (data as PlayerRow[]).map(toPlayer)
  memSet(cacheKey, players, 24 * 60 * 60 * 1000)
  return players
}

/**
 * Get a single player by ID.
 */
export async function getPlayer(id: number): Promise<Player | null> {
  const cacheKey = `player_${id}`
  const cached = memGet<Player>(cacheKey)
  if (cached) return cached

  const { data, error } = await supabase
    .from('player_with_clubs')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!data) return null

  const player = toPlayer(data as PlayerRow)
  memSet(cacheKey, player, 7 * 24 * 60 * 60 * 1000)
  return player
}
