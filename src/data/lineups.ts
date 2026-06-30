export interface LineupSlot {
  id: string
  name: string         // correct player name
  hint: string         // e.g. "CB, Spain" — shown to the user
  x: number           // % from left (0-100)
  y: number           // % from top (0-100)
}

export interface LineupPuzzle {
  id: string
  title: string
  formation: string
  slots: LineupSlot[]
}

export const LINEUPS: LineupPuzzle[] = [
  {
    id: 'barca-2011',
    title: 'Barcelona 2011 UCL Final',
    formation: '4-3-3',
    slots: [
      { id: 'gk',  name: 'Víctor Valdés',   hint: 'GK · Spain',        x: 50, y: 88 },
      { id: 'rb',  name: 'Dani Alves',       hint: 'RB · Brazil',       x: 80, y: 72 },
      { id: 'rcb', name: 'Gerard Piqué',     hint: 'CB · Spain',        x: 63, y: 75 },
      { id: 'lcb', name: 'Carles Puyol',     hint: 'CB · Spain',        x: 37, y: 75 },
      { id: 'lb',  name: 'Eric Abidal',      hint: 'LB · France',       x: 20, y: 72 },
      { id: 'rcm', name: 'Sergio Busquets',  hint: 'CDM · Spain',       x: 65, y: 57 },
      { id: 'cm',  name: 'Xavi',             hint: 'CM · Spain',        x: 50, y: 50 },
      { id: 'lcm', name: 'Andrés Iniesta',   hint: 'CM · Spain',        x: 35, y: 57 },
      { id: 'rw',  name: 'David Villa',      hint: 'RW · Spain',        x: 80, y: 33 },
      { id: 'cf',  name: 'Lionel Messi',     hint: 'CF · Argentina',    x: 50, y: 22 },
      { id: 'lw',  name: 'Pedro',            hint: 'LW · Spain',        x: 20, y: 33 },
    ],
  },
  {
    id: 'france-2018',
    title: 'France 2018 World Cup Final',
    formation: '4-2-3-1',
    slots: [
      { id: 'gk',  name: 'Hugo Lloris',       hint: 'GK · France',       x: 50, y: 88 },
      { id: 'rb',  name: 'Benjamin Pavard',   hint: 'RB · France',       x: 80, y: 72 },
      { id: 'rcb', name: 'Raphaël Varane',    hint: 'CB · France',       x: 63, y: 75 },
      { id: 'lcb', name: 'Samuel Umtiti',     hint: 'CB · France',       x: 37, y: 75 },
      { id: 'lb',  name: 'Lucas Hernández',   hint: 'LB · France',       x: 20, y: 72 },
      { id: 'rdm', name: 'Ngolo Kanté',       hint: 'CDM · France',      x: 62, y: 58 },
      { id: 'ldm', name: 'Paul Pogba',        hint: 'CDM · France',      x: 38, y: 58 },
      { id: 'ram', name: 'Ousmane Dembélé',   hint: 'RAM · France',      x: 78, y: 40 },
      { id: 'cam', name: 'Antoine Griezmann', hint: 'CAM · France',      x: 50, y: 38 },
      { id: 'lam', name: 'Blaise Matuidi',    hint: 'LAM · France',      x: 22, y: 40 },
      { id: 'st',  name: 'Kylian Mbappé',     hint: 'ST · France',       x: 50, y: 20 },
    ],
  },
  {
    id: 'man-utd-1999',
    title: 'Man Utd 1999 CL Final',
    formation: '4-4-2',
    slots: [
      { id: 'gk',  name: 'Peter Schmeichel', hint: 'GK · Denmark',      x: 50, y: 88 },
      { id: 'rb',  name: 'Gary Neville',     hint: 'RB · England',      x: 80, y: 72 },
      { id: 'rcb', name: 'Ronny Johnsen',    hint: 'CB · Norway',       x: 63, y: 75 },
      { id: 'lcb', name: 'Jaap Stam',        hint: 'CB · Netherlands',  x: 37, y: 75 },
      { id: 'lb',  name: 'Denis Irwin',      hint: 'LB · Ireland',      x: 20, y: 72 },
      { id: 'rm',  name: 'David Beckham',    hint: 'RM · England',      x: 80, y: 50 },
      { id: 'rcm', name: 'Roy Keane',        hint: 'CM · Ireland',      x: 63, y: 52 },
      { id: 'lcm', name: 'Nicky Butt',       hint: 'CM · England',      x: 37, y: 52 },
      { id: 'lm',  name: 'Jesper Blomqvist', hint: 'LM · Sweden',       x: 20, y: 50 },
      { id: 'rst', name: 'Andy Cole',        hint: 'ST · England',      x: 63, y: 28 },
      { id: 'lst', name: 'Dwight Yorke',     hint: 'ST · Trinidad',     x: 37, y: 28 },
    ],
  },
]
