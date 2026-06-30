/**
 * Supabase Seed Script
 * Usage:  npx tsx supabase/seed.ts
 *
 * Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env
 * OR export them as environment variables before running.
 */

import { createClient } from '@supabase/supabase-js'
import { CLUBS, PLAYERS } from './seed-data'
import { config } from 'dotenv'

config({ path: '.env' })

const url  = process.env.VITE_SUPABASE_URL ?? ''
// Seed uses the service role key to bypass RLS — never used in the frontend
const key  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(url, key)

async function seed() {
  console.log(`\n⚽ Football Trivia — Seeding Supabase\n`)

  // ── 0. Clear old data (re-seed cleanly) ─────────────────────────────────
  console.log('Clearing old data…')
  await supabase.from('player_clubs').delete().gte('player_id', 0)
  await supabase.from('players').delete().gte('id', 0)
  await supabase.from('clubs').delete().gte('id', 0)
  console.log('✓ Cleared')

  // ── 1. Upsert clubs ──────────────────────────────────────────────────────
  console.log(`Inserting ${CLUBS.length} clubs…`)
  // Try with league column first; fall back without it if the column doesn't exist yet
  const clubRows = CLUBS.map(({ id, name, logo, country, league }) => ({ id, name, logo, country, league }))
  let { error: clubErr } = await supabase.from('clubs').upsert(clubRows, { onConflict: 'id' })
  if (clubErr?.message?.includes("'league'")) {
    console.log('  (league column not yet in DB — run schema.sql in Supabase SQL Editor first, then re-seed)')
    const fallback = CLUBS.map(({ id, name, logo, country }) => ({ id, name, logo, country }));
    ({ error: clubErr } = await supabase.from('clubs').upsert(fallback, { onConflict: 'id' }))
  }
  if (clubErr) { console.error('Clubs error:', clubErr.message); process.exit(1) }
  console.log('✓ Clubs done')

  // ── 2. Upsert players (deduplicate by id+name to handle duplicate IDs in seed data) ──
  const uniquePlayers = new Map<string, typeof PLAYERS[0]>()
  for (const p of PLAYERS) {
    const key = `${p.id}_${p.name}`
    if (!uniquePlayers.has(key)) uniquePlayers.set(key, p)
  }
  const playerRows = [...uniquePlayers.values()].map((p) => ({
    id: p.id,
    name: p.name,
    photo: p.photo,
    nationality: p.nationality,
    age: p.age,
    position: p.position,
  }))

  console.log(`Inserting ${playerRows.length} players…`)
  const { error: playerErr } = await supabase.from('players').upsert(playerRows, { onConflict: 'id' })
  if (playerErr) { console.error('Players error:', playerErr.message); process.exit(1) }
  console.log('✓ Players done')

  // ── 3. Upsert player_clubs ───────────────────────────────────────────────
  const pcRows: { player_id: number; club_id: number; sort_order: number }[] = []
  for (const p of PLAYERS) {
    for (let j = 0; j < p.clubIds.length; j++) {
      pcRows.push({ player_id: p.id, club_id: p.clubIds[j], sort_order: j })
    }
  }

  // De-dupe by (player_id, club_id)
  const pcMap = new Map<string, typeof pcRows[0]>()
  for (const r of pcRows) pcMap.set(`${r.player_id}_${r.club_id}`, r)
  const uniquePC = [...pcMap.values()]

  console.log(`Inserting ${uniquePC.length} player-club links…`)
  const { error: pcErr } = await supabase.from('player_clubs').upsert(uniquePC, { onConflict: 'player_id,club_id' })
  if (pcErr) { console.error('player_clubs error:', pcErr.message); process.exit(1) }
  console.log('✓ Player-club links done')

  console.log('\n🎉 Seed complete! Your Supabase database is ready.\n')
}

seed().catch(err => { console.error(err); process.exit(1) })
