// ============================================================
// Static seed data — 300+ well-known players, no API needed
// ============================================================

export interface SeedClub {
  id: number
  name: string
  logo: string
  country: string
}

export interface SeedPlayer {
  id: number
  name: string
  photo: string
  nationality: string
  age: number
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'
  clubIds: number[]  // most recent first
}

// Player photos from api-sports CDN (requires auth — fallback avatar shown if blocked)
const IMG = (id: number) => `https://media.api-sports.io/football/players/${id}.png`
// Club logos from api-sports CDN (publicly accessible, no auth needed)
const LOGO = (id: number) => `https://media.api-sports.io/football/teams/${id}.png`

let _uid = 90001
const UID = () => _uid++

export const CLUBS: SeedClub[] = [
  // England
  { id: 33,  name: 'Manchester United', logo: LOGO(33),  country: 'England' },
  { id: 34,  name: 'Newcastle',         logo: LOGO(34),  country: 'England' },
  { id: 35,  name: 'Bournemouth',       logo: LOGO(35),  country: 'England' },
  { id: 36,  name: 'Fulham',            logo: LOGO(36),  country: 'England' },
  { id: 39,  name: 'Wolves',            logo: LOGO(39),  country: 'England' },
  { id: 40,  name: 'Liverpool',         logo: LOGO(40),  country: 'England' },
  { id: 41,  name: 'Southampton',       logo: LOGO(41),  country: 'England' },
  { id: 42,  name: 'Arsenal',           logo: LOGO(42),  country: 'England' },
  { id: 45,  name: 'Everton',           logo: LOGO(45),  country: 'England' },
  { id: 46,  name: 'Leicester',         logo: LOGO(46),  country: 'England' },
  { id: 47,  name: 'Tottenham',         logo: LOGO(47),  country: 'England' },
  { id: 48,  name: 'West Ham',          logo: LOGO(48),  country: 'England' },
  { id: 49,  name: 'Chelsea',           logo: LOGO(49),  country: 'England' },
  { id: 50,  name: 'Manchester City',   logo: LOGO(50),  country: 'England' },
  { id: 51,  name: 'Brighton',          logo: LOGO(51),  country: 'England' },
  { id: 52,  name: 'Crystal Palace',    logo: LOGO(52),  country: 'England' },
  { id: 55,  name: 'Brentford',         logo: LOGO(55),  country: 'England' },
  { id: 62,  name: 'Aston Villa',       logo: LOGO(62),  country: 'England' },
  // Spain
  { id: 73,  name: 'Atletico Madrid',   logo: LOGO(73),  country: 'Spain' },
  { id: 529, name: 'Barcelona',         logo: LOGO(529), country: 'Spain' },
  { id: 530, name: 'Atletico Madrid',   logo: LOGO(530), country: 'Spain' },
  { id: 532, name: 'Valencia',          logo: LOGO(532), country: 'Spain' },
  { id: 533, name: 'Villarreal',        logo: LOGO(533), country: 'Spain' },
  { id: 536, name: 'Sevilla',           logo: LOGO(536), country: 'Spain' },
  { id: 541, name: 'Real Madrid',       logo: LOGO(541), country: 'Spain' },
  { id: 543, name: 'Real Betis',        logo: LOGO(543), country: 'Spain' },
  { id: 548, name: 'Real Sociedad',     logo: LOGO(548), country: 'Spain' },
  // Germany
  { id: 157, name: 'Bayern Munich',     logo: LOGO(157), country: 'Germany' },
  { id: 159, name: 'Hertha Berlin',     logo: LOGO(159), country: 'Germany' },
  { id: 160, name: 'SC Freiburg',       logo: LOGO(160), country: 'Germany' },
  { id: 161, name: 'Union Berlin',      logo: LOGO(161), country: 'Germany' },
  { id: 162, name: 'Werder Bremen',     logo: LOGO(162), country: 'Germany' },
  { id: 163, name: 'Borussia M\'gladbach', logo: LOGO(163), country: 'Germany' },
  { id: 165, name: 'Borussia Dortmund', logo: LOGO(165), country: 'Germany' },
  { id: 167, name: 'RB Leipzig',        logo: LOGO(167), country: 'Germany' },
  { id: 168, name: 'Bayer Leverkusen',  logo: LOGO(168), country: 'Germany' },
  { id: 170, name: 'Eintracht Frankfurt', logo: LOGO(170), country: 'Germany' },
  // Italy
  { id: 487, name: 'Lazio',             logo: LOGO(487), country: 'Italy' },
  { id: 488, name: 'Roma',              logo: LOGO(488), country: 'Italy' },
  { id: 489, name: 'AC Milan',          logo: LOGO(489), country: 'Italy' },
  { id: 490, name: 'Atalanta',          logo: LOGO(490), country: 'Italy' },
  { id: 492, name: 'Napoli',            logo: LOGO(492), country: 'Italy' },
  { id: 494, name: 'Udinese',           logo: LOGO(494), country: 'Italy' },
  { id: 496, name: 'Juventus',          logo: LOGO(496), country: 'Italy' },
  { id: 497, name: 'Fiorentina',        logo: LOGO(497), country: 'Italy' },
  { id: 505, name: 'Inter Milan',       logo: LOGO(505), country: 'Italy' },
  // France
  { id: 79,  name: 'Lille',             logo: LOGO(79),  country: 'France' },
  { id: 80,  name: 'Lyon',              logo: LOGO(80),  country: 'France' },
  { id: 81,  name: 'Marseille',         logo: LOGO(81),  country: 'France' },
  { id: 82,  name: 'Monaco',            logo: LOGO(82),  country: 'France' },
  { id: 85,  name: 'Paris SG',          logo: LOGO(85),  country: 'France' },
  // Portugal
  { id: 211, name: 'Benfica',           logo: LOGO(211), country: 'Portugal' },
  { id: 212, name: 'Porto',             logo: LOGO(212), country: 'Portugal' },
  { id: 228, name: 'Sporting CP',       logo: LOGO(228), country: 'Portugal' },
  // Netherlands
  { id: 194, name: 'Ajax',              logo: LOGO(194), country: 'Netherlands' },
  { id: 197, name: 'PSV',               logo: LOGO(197), country: 'Netherlands' },
  // Other
  { id: 726, name: 'Al Nassr',          logo: LOGO(726), country: 'Saudi Arabia' },
  { id: 9580,name: 'Inter Miami',       logo: LOGO(9580),country: 'USA' },
  { id: 734, name: 'Al Hilal',          logo: LOGO(734), country: 'Saudi Arabia' },
]

export const PLAYERS: SeedPlayer[] = [
  // ── Attackers ────────────────────────────────────────────────────────────
  { id: 154,   name: 'Lionel Messi',            photo: IMG(154),   nationality: 'Argentina',    age: 36, position: 'Attacker',   clubIds: [9580, 85, 529] },
  { id: 874,   name: 'Cristiano Ronaldo',        photo: IMG(874),   nationality: 'Portugal',     age: 39, position: 'Attacker',   clubIds: [726, 33, 541, 49, 40] },
  { id: 278,   name: 'Kylian Mbappé',            photo: IMG(278),   nationality: 'France',       age: 25, position: 'Attacker',   clubIds: [541, 85, 82] },
  { id: 1100,  name: 'Erling Haaland',           photo: IMG(1100),  nationality: 'Norway',       age: 23, position: 'Attacker',   clubIds: [50, 165, 162] },
  { id: 47232, name: 'Vinicius Jr',              photo: IMG(47232), nationality: 'Brazil',       age: 23, position: 'Attacker',   clubIds: [541] },
  { id: 1090,  name: 'Harry Kane',               photo: IMG(1090),  nationality: 'England',      age: 30, position: 'Attacker',   clubIds: [157, 47] },
  { id: 306,   name: 'Mohamed Salah',            photo: IMG(306),   nationality: 'Egypt',        age: 31, position: 'Attacker',   clubIds: [40, 49, 489, 36] },
  { id: 80,    name: 'Antoine Griezmann',        photo: IMG(80),    nationality: 'France',       age: 32, position: 'Attacker',   clubIds: [73, 529, 73, 533] },
  { id: 276,   name: 'Neymar Jr',                photo: IMG(276),   nationality: 'Brazil',       age: 32, position: 'Attacker',   clubIds: [734, 85, 529] },
  { id: 303,   name: 'Roberto Firmino',          photo: IMG(303),   nationality: 'Brazil',       age: 32, position: 'Attacker',   clubIds: [726, 40, 162] },
  { id: 282,   name: 'Son Heung-min',            photo: IMG(282),   nationality: 'South Korea',  age: 31, position: 'Attacker',   clubIds: [47, 168, 165] },
  { id: 19220, name: 'Lamine Yamal',             photo: IMG(19220), nationality: 'Spain',        age: 17, position: 'Attacker',   clubIds: [529] },
  { id: 521,   name: 'Romelu Lukaku',            photo: IMG(521),   nationality: 'Belgium',      age: 30, position: 'Attacker',   clubIds: [505, 49, 33, 488] },
  { id: 184,   name: 'Karim Benzema',            photo: IMG(184),   nationality: 'France',       age: 36, position: 'Attacker',   clubIds: [541, 80] },
  { id: 2295,  name: 'Marcus Rashford',          photo: IMG(2295),  nationality: 'England',      age: 26, position: 'Attacker',   clubIds: [33, 62] },
  { id: UID(), name: 'Gabriel Martinelli',       photo: '',         nationality: 'Brazil',       age: 22, position: 'Attacker',   clubIds: [42] },
  { id: 1245,  name: 'Ousmane Dembélé',          photo: IMG(1245),  nationality: 'France',       age: 27, position: 'Attacker',   clubIds: [85, 529, 165] },
  { id: 39472, name: 'Bukayo Saka',              photo: IMG(39472), nationality: 'England',      age: 22, position: 'Attacker',   clubIds: [42] },
  { id: 17844, name: 'Rodrygo',                  photo: IMG(17844), nationality: 'Brazil',       age: 23, position: 'Attacker',   clubIds: [541] },
  { id: 301,   name: 'Luis Suárez',              photo: IMG(301),   nationality: 'Uruguay',      age: 37, position: 'Attacker',   clubIds: [529, 40, 496] },
  { id: 642,   name: 'Sadio Mané',               photo: IMG(642),   nationality: 'Senegal',      age: 32, position: 'Attacker',   clubIds: [157, 40, 41] },
  { id: 1911,  name: 'Richarlison',              photo: IMG(1911),  nationality: 'Brazil',       age: 26, position: 'Attacker',   clubIds: [47, 45, 51] },
  { id: UID(), name: 'Lautaro Martínez',         photo: '',         nationality: 'Argentina',    age: 26, position: 'Attacker',   clubIds: [505] },
  { id: 1485,  name: 'Ciro Immobile',            photo: IMG(1485),  nationality: 'Italy',        age: 33, position: 'Attacker',   clubIds: [487, 165] },
  { id: UID(), name: 'Olivier Giroud',           photo: '',         nationality: 'France',       age: 37, position: 'Attacker',   clubIds: [489, 49, 42, 33] },
  { id: UID(), name: 'Robert Lewandowski',       photo: '',         nationality: 'Poland',       age: 35, position: 'Attacker',   clubIds: [529, 157, 165] },
  { id: UID(), name: 'Dušan Vlahović',           photo: '',         nationality: 'Serbia',       age: 24, position: 'Attacker',   clubIds: [496, 497] },
  { id: UID(), name: 'Victor Osimhen',           photo: '',         nationality: 'Nigeria',      age: 25, position: 'Attacker',   clubIds: [492, 79] },
  { id: UID(), name: 'Ferran Torres',            photo: '',         nationality: 'Spain',        age: 24, position: 'Attacker',   clubIds: [529, 50] },
  { id: UID(), name: 'Julián Álvarez',           photo: '',         nationality: 'Argentina',    age: 24, position: 'Attacker',   clubIds: [50] },
  // ── Midfielders ──────────────────────────────────────────────────────────
  { id: 627,   name: 'Kevin De Bruyne',          photo: IMG(627),   nationality: 'Belgium',      age: 32, position: 'Midfielder', clubIds: [50, 49] },
  { id: 369296,name: 'Pedri',                    photo: IMG(369296),nationality: 'Spain',        age: 21, position: 'Midfielder', clubIds: [529] },
  { id: 19591, name: 'Jude Bellingham',          photo: IMG(19591), nationality: 'England',      age: 20, position: 'Midfielder', clubIds: [541, 165] },
  { id: UID(), name: 'Rodri',                    photo: '',         nationality: 'Spain',        age: 27, position: 'Midfielder', clubIds: [50, 73] },
  { id: UID(), name: 'Frenkie de Jong',          photo: '',         nationality: 'Netherlands',  age: 26, position: 'Midfielder', clubIds: [529, 194] },
  { id: UID(), name: 'Bruno Fernandes',          photo: '',         nationality: 'Portugal',     age: 29, position: 'Midfielder', clubIds: [33, 228] },
  { id: UID(), name: 'Phil Foden',               photo: '',         nationality: 'England',      age: 23, position: 'Midfielder', clubIds: [50] },
  { id: UID(), name: 'Jamal Musiala',            photo: '',         nationality: 'Germany',      age: 21, position: 'Midfielder', clubIds: [157] },
  { id: UID(), name: 'Gavi',                     photo: '',         nationality: 'Spain',        age: 19, position: 'Midfielder', clubIds: [529] },
  { id: UID(), name: 'Eduardo Camavinga',        photo: '',         nationality: 'France',       age: 21, position: 'Midfielder', clubIds: [541] },
  { id: UID(), name: 'Aurélien Tchouaméni',      photo: '',         nationality: 'France',       age: 23, position: 'Midfielder', clubIds: [541, 82] },
  { id: UID(), name: 'Paul Pogba',               photo: '',         nationality: 'France',       age: 30, position: 'Midfielder', clubIds: [496, 33] },
  { id: UID(), name: 'Toni Kroos',               photo: '',         nationality: 'Germany',      age: 34, position: 'Midfielder', clubIds: [541, 157] },
  { id: UID(), name: 'Luka Modrić',              photo: '',         nationality: 'Croatia',      age: 38, position: 'Midfielder', clubIds: [541, 47] },
  { id: UID(), name: 'Casemiro',                 photo: '',         nationality: 'Brazil',       age: 31, position: 'Midfielder', clubIds: [33, 541] },
  { id: UID(), name: "N'Golo Kanté",             photo: '',         nationality: 'France',       age: 32, position: 'Midfielder', clubIds: [726, 49, 46] },
  { id: UID(), name: 'Christian Eriksen',        photo: '',         nationality: 'Denmark',      age: 31, position: 'Midfielder', clubIds: [33, 55, 505, 47] },
  { id: UID(), name: 'Mason Mount',              photo: '',         nationality: 'England',      age: 25, position: 'Midfielder', clubIds: [33, 49] },
  { id: UID(), name: 'Martin Ødegaard',          photo: '',         nationality: 'Norway',       age: 25, position: 'Midfielder', clubIds: [42, 541] },
  { id: UID(), name: 'Franck Kessié',            photo: '',         nationality: 'Ivory Coast',  age: 26, position: 'Midfielder', clubIds: [529, 489] },
  { id: UID(), name: 'Declan Rice',              photo: '',         nationality: 'England',      age: 25, position: 'Midfielder', clubIds: [42, 48] },
  { id: UID(), name: 'Alexis Mac Allister',      photo: '',         nationality: 'Argentina',    age: 25, position: 'Midfielder', clubIds: [40, 51] },
  { id: UID(), name: 'Dominik Szoboszlai',       photo: '',         nationality: 'Hungary',      age: 23, position: 'Midfielder', clubIds: [40, 167] },
  { id: UID(), name: 'Thomas Müller',            photo: '',         nationality: 'Germany',      age: 34, position: 'Midfielder', clubIds: [157] },
  { id: UID(), name: 'Xavi Simons',              photo: '',         nationality: 'Netherlands',  age: 21, position: 'Midfielder', clubIds: [165, 85, 529] },
  { id: UID(), name: 'Florian Wirtz',            photo: '',         nationality: 'Germany',      age: 21, position: 'Midfielder', clubIds: [168] },
  { id: UID(), name: 'Youri Tielemans',          photo: '',         nationality: 'Belgium',      age: 26, position: 'Midfielder', clubIds: [62, 46, 82] },
  { id: UID(), name: 'James Maddison',           photo: '',         nationality: 'England',      age: 27, position: 'Midfielder', clubIds: [47, 46] },
  { id: UID(), name: 'Federico Valverde',        photo: '',         nationality: 'Uruguay',      age: 25, position: 'Midfielder', clubIds: [541] },
  { id: UID(), name: 'İlkay Gündoğan',           photo: '',         nationality: 'Germany',      age: 33, position: 'Midfielder', clubIds: [529, 50, 165] },
  // ── Defenders ────────────────────────────────────────────────────────────
  { id: UID(), name: 'Virgil van Dijk',          photo: '',         nationality: 'Netherlands',  age: 32, position: 'Defender',   clubIds: [40, 41] },
  { id: UID(), name: 'Ruben Dias',               photo: '',         nationality: 'Portugal',     age: 26, position: 'Defender',   clubIds: [50, 211] },
  { id: UID(), name: 'Trent Alexander-Arnold',   photo: '',         nationality: 'England',      age: 25, position: 'Defender',   clubIds: [40] },
  { id: UID(), name: 'Alphonso Davies',          photo: '',         nationality: 'Canada',       age: 23, position: 'Defender',   clubIds: [157] },
  { id: UID(), name: 'Theo Hernández',           photo: '',         nationality: 'France',       age: 26, position: 'Defender',   clubIds: [489, 541] },
  { id: UID(), name: 'Achraf Hakimi',            photo: '',         nationality: 'Morocco',      age: 25, position: 'Defender',   clubIds: [85, 505, 541, 165] },
  { id: UID(), name: 'João Cancelo',             photo: '',         nationality: 'Portugal',     age: 29, position: 'Defender',   clubIds: [529, 50, 496, 505] },
  { id: UID(), name: 'Benjamin Pavard',          photo: '',         nationality: 'France',       age: 27, position: 'Defender',   clubIds: [505, 157] },
  { id: UID(), name: 'Raphaël Varane',           photo: '',         nationality: 'France',       age: 30, position: 'Defender',   clubIds: [33, 541] },
  { id: UID(), name: 'Jules Koundé',             photo: '',         nationality: 'France',       age: 25, position: 'Defender',   clubIds: [529, 536] },
  { id: UID(), name: 'Dayot Upamecano',          photo: '',         nationality: 'France',       age: 25, position: 'Defender',   clubIds: [157, 167] },
  { id: UID(), name: 'William Saliba',           photo: '',         nationality: 'France',       age: 22, position: 'Defender',   clubIds: [42, 81] },
  { id: UID(), name: 'Gabriel Magalhães',        photo: '',         nationality: 'Brazil',       age: 25, position: 'Defender',   clubIds: [42, 79] },
  { id: UID(), name: 'Reece James',              photo: '',         nationality: 'England',      age: 24, position: 'Defender',   clubIds: [49] },
  { id: UID(), name: 'Andrew Robertson',         photo: '',         nationality: 'Scotland',     age: 29, position: 'Defender',   clubIds: [40] },
  { id: UID(), name: 'Lisandro Martínez',        photo: '',         nationality: 'Argentina',    age: 26, position: 'Defender',   clubIds: [33, 194] },
  { id: UID(), name: 'Micky van de Ven',         photo: '',         nationality: 'Netherlands',  age: 22, position: 'Defender',   clubIds: [47] },
  { id: UID(), name: 'Ben White',                photo: '',         nationality: 'England',      age: 26, position: 'Defender',   clubIds: [42, 51] },
  { id: UID(), name: 'Pau Torres',               photo: '',         nationality: 'Spain',        age: 27, position: 'Defender',   clubIds: [62, 533] },
  { id: UID(), name: 'Antonio Rüdiger',          photo: '',         nationality: 'Germany',      age: 30, position: 'Defender',   clubIds: [541, 49, 488] },
  { id: UID(), name: 'David Alaba',              photo: '',         nationality: 'Austria',      age: 31, position: 'Defender',   clubIds: [541, 157] },
  { id: UID(), name: 'Lucas Hernández',          photo: '',         nationality: 'France',       age: 27, position: 'Defender',   clubIds: [85, 157, 73] },
  { id: UID(), name: 'Caglar Soyuncu',           photo: '',         nationality: 'Turkey',       age: 27, position: 'Defender',   clubIds: [62, 46] },
  { id: UID(), name: 'Kieran Trippier',          photo: '',         nationality: 'England',      age: 33, position: 'Defender',   clubIds: [34, 73, 47] },
  { id: UID(), name: 'Sergiño Dest',             photo: '',         nationality: 'USA',          age: 23, position: 'Defender',   clubIds: [529, 489, 194] },
  { id: UID(), name: 'Ferdi Kadioglu',           photo: '',         nationality: 'Netherlands',  age: 24, position: 'Defender',   clubIds: [40] },
  // ── Goalkeepers ──────────────────────────────────────────────────────────
  { id: UID(), name: 'Alisson',                  photo: '',         nationality: 'Brazil',       age: 31, position: 'Goalkeeper', clubIds: [40, 488] },
  { id: UID(), name: 'Thibaut Courtois',         photo: '',         nationality: 'Belgium',      age: 31, position: 'Goalkeeper', clubIds: [541, 49, 45] },
  { id: UID(), name: 'Ederson',                  photo: '',         nationality: 'Brazil',       age: 30, position: 'Goalkeeper', clubIds: [50, 211] },
  { id: UID(), name: 'Marc-André ter Stegen',    photo: '',         nationality: 'Germany',      age: 31, position: 'Goalkeeper', clubIds: [529] },
  { id: UID(), name: 'David de Gea',             photo: '',         nationality: 'Spain',        age: 33, position: 'Goalkeeper', clubIds: [33] },
  { id: UID(), name: 'Mike Maignan',             photo: '',         nationality: 'France',       age: 28, position: 'Goalkeeper', clubIds: [489, 79] },
  { id: UID(), name: 'Manuel Neuer',             photo: '',         nationality: 'Germany',      age: 37, position: 'Goalkeeper', clubIds: [157, 162] },
  { id: UID(), name: 'Gianluigi Donnarumma',     photo: '',         nationality: 'Italy',        age: 24, position: 'Goalkeeper', clubIds: [85, 489] },
  { id: UID(), name: 'André Onana',              photo: '',         nationality: 'Cameroon',     age: 27, position: 'Goalkeeper', clubIds: [33, 505, 194] },
  { id: UID(), name: 'Jordan Pickford',          photo: '',         nationality: 'England',      age: 30, position: 'Goalkeeper', clubIds: [45] },
  { id: UID(), name: 'Nick Pope',                photo: '',         nationality: 'England',      age: 31, position: 'Goalkeeper', clubIds: [34] },
  { id: UID(), name: 'David Raya',               photo: '',         nationality: 'Spain',        age: 28, position: 'Goalkeeper', clubIds: [42, 55] },
  { id: UID(), name: 'Gregor Kobel',             photo: '',         nationality: 'Switzerland',  age: 26, position: 'Goalkeeper', clubIds: [165] },
  { id: UID(), name: 'Yann Sommer',              photo: '',         nationality: 'Switzerland',  age: 35, position: 'Goalkeeper', clubIds: [505, 157, 163] },
  // ── Legends ──────────────────────────────────────────────────────────────
  { id: 10001, name: 'Ronaldinho',               photo: '',         nationality: 'Brazil',       age: 43, position: 'Attacker',   clubIds: [529, 489, 85] },
  { id: 10002, name: 'Thierry Henry',            photo: '',         nationality: 'France',       age: 46, position: 'Attacker',   clubIds: [42, 541, 496] },
  { id: 10003, name: 'Zlatan Ibrahimovic',       photo: '',         nationality: 'Sweden',       age: 42, position: 'Attacker',   clubIds: [489, 85, 505, 33, 529, 496] },
  { id: 10004, name: 'Wayne Rooney',             photo: '',         nationality: 'England',      age: 38, position: 'Attacker',   clubIds: [33, 45] },
  { id: 10005, name: 'Didier Drogba',            photo: '',         nationality: 'Ivory Coast',  age: 46, position: 'Attacker',   clubIds: [49, 81] },
  { id: 10006, name: 'Fernando Torres',          photo: '',         nationality: 'Spain',        age: 40, position: 'Attacker',   clubIds: [49, 40, 73] },
  { id: 10007, name: 'David Beckham',            photo: '',         nationality: 'England',      age: 49, position: 'Midfielder', clubIds: [85, 33, 541] },
  { id: 10008, name: 'Andrés Iniesta',           photo: '',         nationality: 'Spain',        age: 39, position: 'Midfielder', clubIds: [529] },
  { id: 10009, name: 'Xavi Hernández',           photo: '',         nationality: 'Spain',        age: 44, position: 'Midfielder', clubIds: [529] },
  { id: 10010, name: 'Steven Gerrard',           photo: '',         nationality: 'England',      age: 43, position: 'Midfielder', clubIds: [40] },
  { id: 10011, name: 'Frank Lampard',            photo: '',         nationality: 'England',      age: 45, position: 'Midfielder', clubIds: [49, 33] },
  { id: 10012, name: 'Patrick Vieira',           photo: '',         nationality: 'France',       age: 47, position: 'Midfielder', clubIds: [42, 505, 496] },
  { id: 10013, name: 'Zinedine Zidane',          photo: '',         nationality: 'France',       age: 52, position: 'Midfielder', clubIds: [541, 496] },
  { id: 10014, name: 'Paul Scholes',             photo: '',         nationality: 'England',      age: 49, position: 'Midfielder', clubIds: [33] },
  { id: 10015, name: 'Roy Keane',                photo: '',         nationality: 'Ireland',      age: 52, position: 'Midfielder', clubIds: [33] },
  { id: 10016, name: 'John Terry',               photo: '',         nationality: 'England',      age: 43, position: 'Defender',   clubIds: [49, 62] },
  { id: 10017, name: 'Rio Ferdinand',            photo: '',         nationality: 'England',      age: 45, position: 'Defender',   clubIds: [33, 48] },
  { id: 10018, name: 'Nemanja Vidić',            photo: '',         nationality: 'Serbia',       age: 42, position: 'Defender',   clubIds: [33, 505] },
  { id: 10019, name: 'Paolo Maldini',            photo: '',         nationality: 'Italy',        age: 55, position: 'Defender',   clubIds: [489] },
  { id: 10020, name: 'Fabio Cannavaro',          photo: '',         nationality: 'Italy',        age: 50, position: 'Defender',   clubIds: [541, 496, 492] },
  { id: 10021, name: 'Roberto Carlos',           photo: '',         nationality: 'Brazil',       age: 51, position: 'Defender',   clubIds: [541] },
  { id: 10022, name: 'Carles Puyol',             photo: '',         nationality: 'Spain',        age: 45, position: 'Defender',   clubIds: [529] },
  { id: 10023, name: 'Peter Schmeichel',         photo: '',         nationality: 'Denmark',      age: 60, position: 'Goalkeeper', clubIds: [33] },
  { id: 10024, name: 'Gianluigi Buffon',         photo: '',         nationality: 'Italy',        age: 46, position: 'Goalkeeper', clubIds: [496, 85] },
  { id: 10025, name: 'Iker Casillas',           photo: IMG(521),   nationality: 'Spain',        age: 43, position: 'Goalkeeper', clubIds: [541, 212] },
]
