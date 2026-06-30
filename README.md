# Football Trivia PWA

A Progressive Web App with 6 football trivia games, optimised for iPad but works on any device.  
Data is stored in **your own Supabase database** — no API rate limits, works offline after first load.

---

## Setup (one-time, ~5 minutes)

### 1. Create a free Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **"New project"**, pick a name, set a password, choose a region close to you
3. Wait for the project to finish provisioning (~1 min)

### 2. Create the database tables

1. In your Supabase dashboard, go to **SQL Editor → New Query**
2. Copy the entire contents of `supabase/schema.sql` and paste it in
3. Click **Run** — this creates the `players`, `clubs`, and `player_clubs` tables

### 3. Get your project credentials

In your Supabase dashboard go to **Settings → API**:
- Copy the **Project URL** (looks like `https://abcxyz.supabase.co`)
- Copy the **anon public** key

### 4. Configure the app

In the project root, copy `.env.example` to `.env` and fill in your values:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...your-anon-key...
```

### 5. Install dependencies

```
npm install
```

### 6. Seed the database (one-time)

This loads 300+ players and all clubs into your Supabase database from the bundled dataset.  
No API keys needed — runs in seconds.

```
npm run seed
```

You'll see output like:
```
⚽ Football Trivia — Seeding Supabase

Inserting 37 clubs…
✓ Clubs done
Inserting 102 players…
✓ Players done
Inserting 198 player-club links…
✓ Player-club links done

🎉 Seed complete! Your Supabase database is ready.
```

### 7. Run the app

```
npm run dev
```

Open `http://localhost:5173` in your browser, or your iPad via `http://YOUR_PC_IP:5173`.

---

## Add to iPad Home Screen

On your iPad in **Safari**:
1. Open the app URL
2. Tap the **Share** button (box with upward arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **Add** — the app installs and runs full-screen like a native app

---

## Game Modes

| Game | Description | Needs DB? |
|------|-------------|-----------|
| **Grid** | Tiki-Taka-Toe — match players to two criteria | Yes (search) |
| **Footle** | Wordle for players — 6 guesses with hints | No |
| **Quiz** | 10 questions, 30-second timer | No |
| **Connections** | Group 16 items into 4 hidden categories | No |
| **Lineup Builder** | Identify all 11 players in a famous XI | No |
| **Transfer Chain** | Link two players through shared clubs | No |

Only the **Grid** game queries the database for player search. All other games use bundled data and work fully offline.

---

## Add More Players

You can add players directly in Supabase:

1. Go to **Table Editor → players** and insert rows
2. Go to **Table Editor → player_clubs** and add their club history
3. Changes are live immediately — no app rebuild needed

Or edit `supabase/seed-data.ts` and re-run `npm run seed`.

---

## Build for Production

```
npm run build
```

Output goes to `dist/`. Host it on **Netlify**, **Vercel**, or **GitHub Pages** — your iPad can then access it from anywhere, not just your home network.

> **Note:** For production, add your Supabase URL and anon key as environment variables in your hosting platform's settings. The anon key is safe to expose publicly (it's read-only by design).
