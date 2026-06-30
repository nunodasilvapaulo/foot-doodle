export interface ConnectionsCategory {
  label: string
  color: string
  items: string[]
}

export interface ConnectionsPuzzle {
  id: string
  title: string
  categories: ConnectionsCategory[]
}

export const PUZZLES: ConnectionsPuzzle[] = [
  {
    id: 'p1',
    title: 'Football Connections #1',
    categories: [
      { label: 'Played for Man Utd & Real Madrid', color: '#F78166', items: ['Cristiano Ronaldo', 'David Beckham', 'Ruud van Nistelrooy', 'Ángel Di María'] },
      { label: 'Former Liverpool managers', color: '#3FB950', items: ['Jürgen Klopp', 'Brendan Rodgers', 'Rafael Benítez', 'Kenny Dalglish'] },
      { label: 'Won the WC with France', color: '#D2A8FF', items: ['Kylian Mbappé', 'Antoine Griezmann', 'Paul Pogba', 'Raphaël Varane'] },
      { label: 'German clubs in the Bundesliga', color: '#FFA657', items: ['Bayern Munich', 'Borussia Dortmund', 'Bayer Leverkusen', 'RB Leipzig'] },
    ],
  },
  {
    id: 'p2',
    title: 'Football Connections #2',
    categories: [
      { label: 'Spanish clubs', color: '#58A6FF', items: ['Real Madrid', 'Barcelona', 'Atletico Madrid', 'Valencia'] },
      { label: 'Famous #10s', color: '#F78166', items: ["Pelé", "Maradona", "Zidane", "Messi"] },
      { label: 'Won Ballon d\'Or', color: '#3FB950', items: ['Ronaldinho', 'Owen', 'Cannavaro', 'Shevchenko'] },
      { label: 'Countries in CONCACAF', color: '#FFA657', items: ['Mexico', 'USA', 'Costa Rica', 'Jamaica'] },
    ],
  },
  {
    id: 'p3',
    title: 'Football Connections #3',
    categories: [
      { label: 'Played for both Arsenal & Chelsea', color: '#D2A8FF', items: ['Ashley Cole', 'William Gallas', 'Cesc Fàbregas', 'Emmanuel Petit'] },
      { label: 'Italy World Cup winners 2006', color: '#3FB950', items: ['Cannavaro', 'Buffon', 'Totti', 'Del Piero'] },
      { label: 'Top scorers in a single PL season', color: '#F78166', items: ['Shearer', 'Salah', 'Van Nistelrooy', 'Vardy'] },
      { label: 'La Liga club nicknames', color: '#FFA657', items: ['Los Merengues', 'Los Culés', 'Los Colchoneros', 'Los Che'] },
    ],
  },
]
