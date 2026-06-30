import type { APIResponse } from './models'

const BASE_URL = 'https://v3.football.api-sports.io'

// Store API key in localStorage so user sets it once
const API_KEY_STORAGE = 'ft_api_key'

export function getApiKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) ?? ''
}

export function setApiKey(key: string) {
  localStorage.setItem(API_KEY_STORAGE, key)
}

export function hasApiKey(): boolean {
  return !!getApiKey()
}

// Simple rate-limit tracker — API-Football free tier is 100 req/day
const RATE_KEY = 'ft_rate'
interface RateState { date: string; count: number }

function getRateState(): RateState {
  const raw = localStorage.getItem(RATE_KEY)
  const today = new Date().toISOString().slice(0, 10)
  if (!raw) return { date: today, count: 0 }
  const s = JSON.parse(raw) as RateState
  return s.date === today ? s : { date: today, count: 0 }
}

function incrementRate() {
  const s = getRateState()
  localStorage.setItem(RATE_KEY, JSON.stringify({ ...s, count: s.count + 1 }))
}

export function getRemainingRequests(): number {
  return Math.max(0, 100 - getRateState().count)
}

export async function apiFetch<T>(
  path: string,
  params: Record<string, string | number> = {}
): Promise<APIResponse<T>> {
  const key = getApiKey()
  if (!key) throw new Error('API key not set')
  if (getRemainingRequests() === 0) throw new Error('Daily API limit reached (100 req/day)')

  const url = new URL(`${BASE_URL}${path}`)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v))
  }

  const res = await fetch(url.toString(), {
    headers: { 'x-apisports-key': key },
  })

  if (!res.ok) throw new Error(`API error ${res.status}`)
  incrementRate()
  return res.json() as Promise<APIResponse<T>>
}
