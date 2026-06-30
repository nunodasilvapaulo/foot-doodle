/**
 * Checks that Supabase env vars are configured before rendering the app.
 * In production builds these are baked in at build time via .env.
 * Shows a friendly setup screen if they're missing.
 */
export default function ApiKeyGate({ children }: { children: React.ReactNode }) {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-6 bg-[#0D1117]">
        <div className="w-full max-w-md space-y-5 text-center">
          <div className="text-5xl">⚽</div>
          <h1 className="text-2xl font-bold text-white">Football Trivia</h1>
          <div className="bg-[#161B22] border border-[#F78166]/40 rounded-2xl p-5 text-left space-y-3">
            <p className="text-[#F78166] font-semibold text-sm">⚠️ Supabase not configured</p>
            <p className="text-[#8B949E] text-sm">
              Create a <code className="text-white bg-[#0D1117] px-1 rounded">.env</code> file in the project root with:
            </p>
            <pre className="bg-[#0D1117] rounded-xl p-3 text-xs text-[#3FB950] overflow-x-auto whitespace-pre-wrap">
{`VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...`}
            </pre>
            <p className="text-[#8B949E] text-xs">
              Then restart <code className="text-white">npm run dev</code>. See README for full setup steps.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
