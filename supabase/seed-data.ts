// ============================================================
// Static seed data — ages correct as of June 30, 2026
// ============================================================

export interface SeedClub {
  id: number
  name: string
  logo: string
  country: string
  league: string
}

export interface SeedPlayer {
  id: number
  name: string
  photo: string
  nationality: string
  age: number
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'
  clubIds: number[]   // most recent first
}

const IMG  = (id: number) => `https://media.api-sports.io/football/players/${id}.png`
const LOGO = (id: number) => `https://media.api-sports.io/football/teams/${id}.png`

let _uid = 90001
const UID = () => _uid++

// ── Clubs ─────────────────────────────────────────────────────────────────────

export const CLUBS: SeedClub[] = [
  // Premier League
  { id: 33,  name: 'Manchester United', logo: LOGO(33),  country: 'England', league: 'Premier League' },
  { id: 34,  name: 'Newcastle',         logo: LOGO(34),  country: 'England', league: 'Premier League' },
  { id: 35,  name: 'Bournemouth',       logo: LOGO(35),  country: 'England', league: 'Premier League' },
  { id: 36,  name: 'Fulham',            logo: LOGO(36),  country: 'England', league: 'Premier League' },
  { id: 39,  name: 'Wolves',            logo: LOGO(39),  country: 'England', league: 'Premier League' },
  { id: 40,  name: 'Liverpool',         logo: LOGO(40),  country: 'England', league: 'Premier League' },
  { id: 41,  name: 'Southampton',       logo: LOGO(41),  country: 'England', league: 'Premier League' },
  { id: 42,  name: 'Arsenal',           logo: LOGO(42),  country: 'England', league: 'Premier League' },
  { id: 45,  name: 'Everton',           logo: LOGO(45),  country: 'England', league: 'Premier League' },
  { id: 46,  name: 'Leicester',         logo: LOGO(46),  country: 'England', league: 'Premier League' },
  { id: 47,  name: 'Tottenham',         logo: LOGO(47),  country: 'England', league: 'Premier League' },
  { id: 48,  name: 'West Ham',          logo: LOGO(48),  country: 'England', league: 'Premier League' },
  { id: 49,  name: 'Chelsea',           logo: LOGO(49),  country: 'England', league: 'Premier League' },
  { id: 50,  name: 'Manchester City',   logo: LOGO(50),  country: 'England', league: 'Premier League' },
  { id: 51,  name: 'Brighton',          logo: LOGO(51),  country: 'England', league: 'Premier League' },
  { id: 52,  name: 'Crystal Palace',    logo: LOGO(52),  country: 'England', league: 'Premier League' },
  { id: 55,  name: 'Brentford',         logo: LOGO(55),  country: 'England', league: 'Premier League' },
  { id: 62,  name: 'Aston Villa',       logo: LOGO(62),  country: 'England', league: 'Premier League' },
  // La Liga
  { id: 541, name: 'Real Madrid',       logo: LOGO(541), country: 'Spain',   league: 'La Liga' },
  { id: 529, name: 'Barcelona',         logo: LOGO(529), country: 'Spain',   league: 'La Liga' },
  { id: 530, name: 'Atletico Madrid',   logo: LOGO(530), country: 'Spain',   league: 'La Liga' },
  { id: 532, name: 'Valencia',          logo: LOGO(532), country: 'Spain',   league: 'La Liga' },
  { id: 533, name: 'Villarreal',        logo: LOGO(533), country: 'Spain',   league: 'La Liga' },
  { id: 536, name: 'Sevilla',           logo: LOGO(536), country: 'Spain',   league: 'La Liga' },
  { id: 543, name: 'Real Betis',        logo: LOGO(543), country: 'Spain',   league: 'La Liga' },
  { id: 548, name: 'Real Sociedad',     logo: LOGO(548), country: 'Spain',   league: 'La Liga' },
  // Bundesliga
  { id: 157, name: 'Bayern Munich',     logo: LOGO(157), country: 'Germany', league: 'Bundesliga' },
  { id: 159, name: 'Hertha Berlin',     logo: LOGO(159), country: 'Germany', league: 'Bundesliga' },
  { id: 160, name: 'SC Freiburg',       logo: LOGO(160), country: 'Germany', league: 'Bundesliga' },
  { id: 161, name: 'Union Berlin',      logo: LOGO(161), country: 'Germany', league: 'Bundesliga' },
  { id: 162, name: 'Werder Bremen',     logo: LOGO(162), country: 'Germany', league: 'Bundesliga' },
  { id: 163, name: "Borussia M'gladbach",logo:LOGO(163), country: 'Germany', league: 'Bundesliga' },
  { id: 165, name: 'Borussia Dortmund', logo: LOGO(165), country: 'Germany', league: 'Bundesliga' },
  { id: 167, name: 'RB Leipzig',        logo: LOGO(167), country: 'Germany', league: 'Bundesliga' },
  { id: 168, name: 'Bayer Leverkusen',  logo: LOGO(168), country: 'Germany', league: 'Bundesliga' },
  { id: 170, name: 'Eintracht Frankfurt',logo:LOGO(170), country: 'Germany', league: 'Bundesliga' },
  // Serie A
  { id: 487, name: 'Lazio',             logo: LOGO(487), country: 'Italy',   league: 'Serie A' },
  { id: 488, name: 'Roma',              logo: LOGO(488), country: 'Italy',   league: 'Serie A' },
  { id: 489, name: 'AC Milan',          logo: LOGO(489), country: 'Italy',   league: 'Serie A' },
  { id: 490, name: 'Atalanta',          logo: LOGO(490), country: 'Italy',   league: 'Serie A' },
  { id: 492, name: 'Napoli',            logo: LOGO(492), country: 'Italy',   league: 'Serie A' },
  { id: 494, name: 'Udinese',           logo: LOGO(494), country: 'Italy',   league: 'Serie A' },
  { id: 496, name: 'Juventus',          logo: LOGO(496), country: 'Italy',   league: 'Serie A' },
  { id: 497, name: 'Fiorentina',        logo: LOGO(497), country: 'Italy',   league: 'Serie A' },
  { id: 505, name: 'Inter Milan',       logo: LOGO(505), country: 'Italy',   league: 'Serie A' },
  // Ligue 1
  { id: 79,  name: 'Lille',             logo: LOGO(79),  country: 'France',  league: 'Ligue 1' },
  { id: 80,  name: 'Lyon',              logo: LOGO(80),  country: 'France',  league: 'Ligue 1' },
  { id: 81,  name: 'Marseille',         logo: LOGO(81),  country: 'France',  league: 'Ligue 1' },
  { id: 82,  name: 'Monaco',            logo: LOGO(82),  country: 'France',  league: 'Ligue 1' },
  { id: 85,  name: 'Paris SG',          logo: LOGO(85),  country: 'France',  league: 'Ligue 1' },
  { id: 91,  name: 'Rennes',            logo: LOGO(91),  country: 'France',  league: 'Ligue 1' },
  // Primeira Liga
  { id: 211, name: 'Benfica',           logo: LOGO(211), country: 'Portugal', league: 'Primeira Liga' },
  { id: 212, name: 'Porto',             logo: LOGO(212), country: 'Portugal', league: 'Primeira Liga' },
  { id: 228, name: 'Sporting CP',       logo: LOGO(228), country: 'Portugal', league: 'Primeira Liga' },
  // Eredivisie
  { id: 193, name: 'Feyenoord',         logo: LOGO(193), country: 'Netherlands', league: 'Eredivisie' },
  { id: 194, name: 'Ajax',              logo: LOGO(194), country: 'Netherlands', league: 'Eredivisie' },
  { id: 197, name: 'PSV',               logo: LOGO(197), country: 'Netherlands', league: 'Eredivisie' },
  // Scottish Premiership
  { id: 273, name: 'Rangers',           logo: LOGO(273), country: 'Scotland', league: 'Scottish Prem.' },
  { id: 274, name: 'Celtic',            logo: LOGO(274), country: 'Scotland', league: 'Scottish Prem.' },
  // Turkish Süper Lig
  { id: 635, name: 'Fenerbahçe',        logo: LOGO(635), country: 'Turkey',  league: 'Süper Lig' },
  { id: 645, name: 'Beşiktaş',          logo: LOGO(645), country: 'Turkey',  league: 'Süper Lig' },
  { id: 1078,name: 'Galatasaray',       logo: LOGO(1078),country: 'Turkey',  league: 'Süper Lig' },
  // Belgian Pro League
  { id: 286, name: 'Club Brugge',       logo: LOGO(286), country: 'Belgium', league: 'Pro League' },
  { id: 261, name: 'Anderlecht',        logo: LOGO(261), country: 'Belgium', league: 'Pro League' },
  // Saudi Pro League
  { id: 726, name: 'Al Nassr',          logo: LOGO(726), country: 'Saudi Arabia', league: 'Saudi Pro League' },
  { id: 734, name: 'Al Hilal',          logo: LOGO(734), country: 'Saudi Arabia', league: 'Saudi Pro League' },
  { id: 2932,name: 'Al Ittihad',        logo: LOGO(2932),country: 'Saudi Arabia', league: 'Saudi Pro League' },
  { id: 2733,name: 'Al Ahli',           logo: LOGO(2733),country: 'Saudi Arabia', league: 'Saudi Pro League' },
  { id: 2936,name: 'Al Qadsiah',        logo: LOGO(2936),country: 'Saudi Arabia', league: 'Saudi Pro League' },
  // MLS
  { id: 9580,name: 'Inter Miami',       logo: LOGO(9580),country: 'USA',     league: 'MLS' },
  { id: 1610,name: 'LA Galaxy',         logo: LOGO(1610),country: 'USA',     league: 'MLS' },
  { id: 1611,name: 'NYCFC',             logo: LOGO(1611),country: 'USA',     league: 'MLS' },
  // Brazilian Série A
  { id: 128, name: 'Flamengo',          logo: LOGO(128), country: 'Brazil',  league: 'Série A' },
  { id: 129, name: 'Santos',            logo: LOGO(129), country: 'Brazil',  league: 'Série A' },
  { id: 131, name: 'Palmeiras',         logo: LOGO(131), country: 'Brazil',  league: 'Série A' },
  { id: 133, name: 'Atlético Mineiro',  logo: LOGO(133), country: 'Brazil',  league: 'Série A' },
  // Liga MX
  { id: 2284,name: 'Club América',      logo: LOGO(2284),country: 'Mexico',  league: 'Liga MX' },
]

// ── Players ───────────────────────────────────────────────────────────────────
// Ages as of June 30, 2026
// clubIds[0] = current club

export const PLAYERS: SeedPlayer[] = [
  // ══════════════════════════════════════════
  // ATTACKERS
  // ══════════════════════════════════════════
  { id: 154,   name: 'Lionel Messi',             photo: IMG(154),   nationality: 'Argentina',    age: 39, position: 'Attacker',   clubIds: [9580, 85, 529] },
  { id: 874,   name: 'Cristiano Ronaldo',         photo: IMG(874),   nationality: 'Portugal',     age: 41, position: 'Attacker',   clubIds: [726, 33, 541, 49, 40] },
  { id: 278,   name: 'Kylian Mbappé',             photo: IMG(278),   nationality: 'France',       age: 27, position: 'Attacker',   clubIds: [541, 85, 82] },
  { id: 1100,  name: 'Erling Haaland',            photo: IMG(1100),  nationality: 'Norway',       age: 25, position: 'Attacker',   clubIds: [50, 165, 162] },
  { id: 47232, name: 'Vinicius Jr',               photo: IMG(47232), nationality: 'Brazil',       age: 25, position: 'Attacker',   clubIds: [541] },
  { id: 1090,  name: 'Harry Kane',                photo: IMG(1090),  nationality: 'England',      age: 32, position: 'Attacker',   clubIds: [157, 47] },
  { id: 306,   name: 'Mohamed Salah',             photo: IMG(306),   nationality: 'Egypt',        age: 34, position: 'Attacker',   clubIds: [40, 49, 489, 36] },
  { id: 80,    name: 'Antoine Griezmann',         photo: IMG(80),    nationality: 'France',       age: 35, position: 'Attacker',   clubIds: [530, 529, 533] },
  { id: 276,   name: 'Neymar Jr',                 photo: IMG(276),   nationality: 'Brazil',       age: 34, position: 'Attacker',   clubIds: [129, 734, 85, 529] },
  { id: 303,   name: 'Roberto Firmino',           photo: IMG(303),   nationality: 'Brazil',       age: 34, position: 'Attacker',   clubIds: [2733, 40, 162] },
  { id: 282,   name: 'Son Heung-min',             photo: IMG(282),   nationality: 'South Korea',  age: 33, position: 'Attacker',   clubIds: [47, 168, 165] },
  { id: 19220, name: 'Lamine Yamal',              photo: IMG(19220), nationality: 'Spain',        age: 18, position: 'Attacker',   clubIds: [529] },
  { id: 521,   name: 'Romelu Lukaku',             photo: IMG(521),   nationality: 'Belgium',      age: 33, position: 'Attacker',   clubIds: [492, 505, 49, 33, 488] },
  { id: 184,   name: 'Karim Benzema',             photo: IMG(184),   nationality: 'France',       age: 38, position: 'Attacker',   clubIds: [2932, 541, 80] },
  { id: 2295,  name: 'Marcus Rashford',           photo: IMG(2295),  nationality: 'England',      age: 28, position: 'Attacker',   clubIds: [33, 62] },
  { id: UID(), name: 'Gabriel Martinelli',        photo: '',         nationality: 'Brazil',       age: 25, position: 'Attacker',   clubIds: [42] },
  { id: 1245,  name: 'Ousmane Dembélé',           photo: IMG(1245),  nationality: 'France',       age: 29, position: 'Attacker',   clubIds: [85, 529, 165] },
  { id: 39472, name: 'Bukayo Saka',               photo: IMG(39472), nationality: 'England',      age: 24, position: 'Attacker',   clubIds: [42] },
  { id: 17844, name: 'Rodrygo',                   photo: IMG(17844), nationality: 'Brazil',       age: 25, position: 'Attacker',   clubIds: [541] },
  { id: 301,   name: 'Luis Suárez',               photo: IMG(301),   nationality: 'Uruguay',      age: 39, position: 'Attacker',   clubIds: [529, 40, 496] },
  { id: 642,   name: 'Sadio Mané',                photo: IMG(642),   nationality: 'Senegal',      age: 34, position: 'Attacker',   clubIds: [157, 40, 41] },
  { id: 1911,  name: 'Richarlison',               photo: IMG(1911),  nationality: 'Brazil',       age: 29, position: 'Attacker',   clubIds: [47, 45, 51] },
  { id: UID(), name: 'Lautaro Martínez',          photo: '',         nationality: 'Argentina',    age: 28, position: 'Attacker',   clubIds: [505] },
  { id: 1485,  name: 'Ciro Immobile',             photo: IMG(1485),  nationality: 'Italy',        age: 36, position: 'Attacker',   clubIds: [487, 165] },
  { id: UID(), name: 'Olivier Giroud',            photo: '',         nationality: 'France',       age: 39, position: 'Attacker',   clubIds: [489, 49, 42, 33] },
  { id: UID(), name: 'Robert Lewandowski',        photo: '',         nationality: 'Poland',       age: 37, position: 'Attacker',   clubIds: [529, 157, 165] },
  { id: UID(), name: 'Dušan Vlahović',            photo: '',         nationality: 'Serbia',       age: 26, position: 'Attacker',   clubIds: [496, 497] },
  { id: UID(), name: 'Victor Osimhen',            photo: '',         nationality: 'Nigeria',      age: 27, position: 'Attacker',   clubIds: [1078, 492, 79] },
  { id: UID(), name: 'Ferran Torres',             photo: '',         nationality: 'Spain',        age: 26, position: 'Attacker',   clubIds: [529, 50] },
  { id: UID(), name: 'Julián Álvarez',            photo: '',         nationality: 'Argentina',    age: 26, position: 'Attacker',   clubIds: [530, 50] },
  { id: UID(), name: 'Cole Palmer',               photo: '',         nationality: 'England',      age: 24, position: 'Attacker',   clubIds: [49, 50] },
  { id: UID(), name: 'Khvicha Kvaratskhelia',     photo: '',         nationality: 'Georgia',      age: 23, position: 'Attacker',   clubIds: [85, 492] },
  { id: UID(), name: 'Rafael Leão',               photo: '',         nationality: 'Portugal',     age: 25, position: 'Attacker',   clubIds: [489] },
  { id: UID(), name: 'Riyad Mahrez',              photo: '',         nationality: 'Algeria',      age: 35, position: 'Attacker',   clubIds: [2733, 50, 46] },
  { id: UID(), name: 'Heung-min Son',             photo: '',         nationality: 'South Korea',  age: 33, position: 'Attacker',   clubIds: [47] },
  { id: UID(), name: 'Marcus Thuram',             photo: '',         nationality: 'France',       age: 27, position: 'Attacker',   clubIds: [505, 163] },
  { id: UID(), name: 'Evan Ferguson',             photo: '',         nationality: 'Ireland',      age: 21, position: 'Attacker',   clubIds: [51] },
  { id: UID(), name: 'Rasmus Højlund',            photo: '',         nationality: 'Denmark',      age: 22, position: 'Attacker',   clubIds: [33, 490] },
  { id: UID(), name: 'Santiago Giménez',          photo: '',         nationality: 'Mexico',       age: 24, position: 'Attacker',   clubIds: [489, 193] },
  { id: UID(), name: 'Benjamin Šeško',            photo: '',         nationality: 'Slovenia',     age: 22, position: 'Attacker',   clubIds: [157, 167, 162] },
  { id: UID(), name: 'Ivan Toney',                photo: '',         nationality: 'England',      age: 29, position: 'Attacker',   clubIds: [55] },
  // ══════════════════════════════════════════
  // MIDFIELDERS
  // ══════════════════════════════════════════
  { id: 627,   name: 'Kevin De Bruyne',           photo: IMG(627),   nationality: 'Belgium',      age: 35, position: 'Midfielder', clubIds: [492, 50, 49] },
  { id: 369296,name: 'Pedri',                     photo: IMG(369296),nationality: 'Spain',        age: 23, position: 'Midfielder', clubIds: [529] },
  { id: 19591, name: 'Jude Bellingham',           photo: IMG(19591), nationality: 'England',      age: 23, position: 'Midfielder', clubIds: [541, 165] },
  { id: UID(), name: 'Rodri',                     photo: '',         nationality: 'Spain',        age: 30, position: 'Midfielder', clubIds: [50, 530] },
  { id: UID(), name: 'Frenkie de Jong',           photo: '',         nationality: 'Netherlands',  age: 29, position: 'Midfielder', clubIds: [529, 194] },
  { id: UID(), name: 'Bruno Fernandes',           photo: '',         nationality: 'Portugal',     age: 31, position: 'Midfielder', clubIds: [33, 228] },
  { id: UID(), name: 'Phil Foden',                photo: '',         nationality: 'England',      age: 26, position: 'Midfielder', clubIds: [50] },
  { id: UID(), name: 'Jamal Musiala',             photo: '',         nationality: 'Germany',      age: 23, position: 'Midfielder', clubIds: [157] },
  { id: UID(), name: 'Gavi',                      photo: '',         nationality: 'Spain',        age: 21, position: 'Midfielder', clubIds: [529] },
  { id: UID(), name: 'Eduardo Camavinga',         photo: '',         nationality: 'France',       age: 23, position: 'Midfielder', clubIds: [541] },
  { id: UID(), name: 'Aurélien Tchouaméni',       photo: '',         nationality: 'France',       age: 26, position: 'Midfielder', clubIds: [541, 82] },
  { id: UID(), name: 'Paul Pogba',                photo: '',         nationality: 'France',       age: 33, position: 'Midfielder', clubIds: [496, 33] },
  { id: UID(), name: 'Luka Modrić',               photo: '',         nationality: 'Croatia',      age: 40, position: 'Midfielder', clubIds: [541, 47] },
  { id: UID(), name: 'Casemiro',                  photo: '',         nationality: 'Brazil',       age: 34, position: 'Midfielder', clubIds: [33, 541] },
  { id: UID(), name: "N'Golo Kanté",              photo: '',         nationality: 'France',       age: 35, position: 'Midfielder', clubIds: [2932, 49, 46] },
  { id: UID(), name: 'Christian Eriksen',         photo: '',         nationality: 'Denmark',      age: 34, position: 'Midfielder', clubIds: [33, 55, 505, 47] },
  { id: UID(), name: 'Mason Mount',               photo: '',         nationality: 'England',      age: 27, position: 'Midfielder', clubIds: [33, 49] },
  { id: UID(), name: 'Martin Ødegaard',           photo: '',         nationality: 'Norway',       age: 27, position: 'Midfielder', clubIds: [42, 541] },
  { id: UID(), name: 'Franck Kessié',             photo: '',         nationality: 'Ivory Coast',  age: 29, position: 'Midfielder', clubIds: [529, 489] },
  { id: UID(), name: 'Declan Rice',               photo: '',         nationality: 'England',      age: 27, position: 'Midfielder', clubIds: [42, 48] },
  { id: UID(), name: 'Alexis Mac Allister',       photo: '',         nationality: 'Argentina',    age: 27, position: 'Midfielder', clubIds: [40, 51] },
  { id: UID(), name: 'Dominik Szoboszlai',        photo: '',         nationality: 'Hungary',      age: 25, position: 'Midfielder', clubIds: [40, 167] },
  { id: UID(), name: 'Thomas Müller',             photo: '',         nationality: 'Germany',      age: 36, position: 'Midfielder', clubIds: [157] },
  { id: UID(), name: 'Xavi Simons',               photo: '',         nationality: 'Netherlands',  age: 23, position: 'Midfielder', clubIds: [165, 85, 529] },
  { id: UID(), name: 'Florian Wirtz',             photo: '',         nationality: 'Germany',      age: 23, position: 'Midfielder', clubIds: [168] },
  { id: UID(), name: 'Youri Tielemans',           photo: '',         nationality: 'Belgium',      age: 29, position: 'Midfielder', clubIds: [62, 46, 82] },
  { id: UID(), name: 'James Maddison',            photo: '',         nationality: 'England',      age: 29, position: 'Midfielder', clubIds: [47, 46] },
  { id: UID(), name: 'Federico Valverde',         photo: '',         nationality: 'Uruguay',      age: 27, position: 'Midfielder', clubIds: [541] },
  { id: UID(), name: 'İlkay Gündoğan',            photo: '',         nationality: 'Germany',      age: 35, position: 'Midfielder', clubIds: [529, 50, 165] },
  { id: UID(), name: 'Enzo Fernández',            photo: '',         nationality: 'Argentina',    age: 25, position: 'Midfielder', clubIds: [49, 211] },
  { id: UID(), name: 'Leroy Sané',                photo: '',         nationality: 'Germany',      age: 30, position: 'Midfielder', clubIds: [157, 50] },
  { id: UID(), name: 'Serge Gnabry',              photo: '',         nationality: 'Germany',      age: 30, position: 'Midfielder', clubIds: [157, 42] },
  { id: UID(), name: 'Granit Xhaka',              photo: '',         nationality: 'Switzerland',  age: 33, position: 'Midfielder', clubIds: [168, 42] },
  { id: UID(), name: 'Thomas Partey',             photo: '',         nationality: 'Ghana',        age: 31, position: 'Midfielder', clubIds: [42, 530] },
  { id: UID(), name: 'Thiago Alcântara',          photo: '',         nationality: 'Spain',        age: 34, position: 'Midfielder', clubIds: [40, 157] },
  { id: UID(), name: 'Vitinha',                   photo: '',         nationality: 'Portugal',     age: 25, position: 'Midfielder', clubIds: [85, 212] },
  { id: UID(), name: 'Warren Zaïre-Emery',        photo: '',         nationality: 'France',       age: 19, position: 'Midfielder', clubIds: [85] },
  { id: UID(), name: 'Nicolo Barella',            photo: '',         nationality: 'Italy',        age: 27, position: 'Midfielder', clubIds: [505] },
  { id: UID(), name: 'Sofyan Amrabat',            photo: '',         nationality: 'Morocco',      age: 29, position: 'Midfielder', clubIds: [33, 497] },
  // ══════════════════════════════════════════
  // DEFENDERS
  // ══════════════════════════════════════════
  { id: UID(), name: 'Virgil van Dijk',           photo: '',         nationality: 'Netherlands',  age: 34, position: 'Defender',   clubIds: [40, 41] },
  { id: UID(), name: 'Ruben Dias',                photo: '',         nationality: 'Portugal',     age: 29, position: 'Defender',   clubIds: [50, 211] },
  { id: UID(), name: 'Trent Alexander-Arnold',    photo: '',         nationality: 'England',      age: 27, position: 'Defender',   clubIds: [541, 40] },
  { id: UID(), name: 'Alphonso Davies',           photo: '',         nationality: 'Canada',       age: 25, position: 'Defender',   clubIds: [157] },
  { id: UID(), name: 'Theo Hernández',            photo: '',         nationality: 'France',       age: 28, position: 'Defender',   clubIds: [489, 541] },
  { id: UID(), name: 'Achraf Hakimi',             photo: '',         nationality: 'Morocco',      age: 27, position: 'Defender',   clubIds: [85, 505, 541, 165] },
  { id: UID(), name: 'João Cancelo',              photo: '',         nationality: 'Portugal',     age: 32, position: 'Defender',   clubIds: [529, 50, 496, 505] },
  { id: UID(), name: 'Benjamin Pavard',           photo: '',         nationality: 'France',       age: 35, position: 'Defender',   clubIds: [505, 157] },
  { id: UID(), name: 'Jules Koundé',              photo: '',         nationality: 'France',       age: 27, position: 'Defender',   clubIds: [529, 536] },
  { id: UID(), name: 'Dayot Upamecano',           photo: '',         nationality: 'France',       age: 27, position: 'Defender',   clubIds: [157, 167] },
  { id: UID(), name: 'William Saliba',            photo: '',         nationality: 'France',       age: 25, position: 'Defender',   clubIds: [42, 81] },
  { id: UID(), name: 'Gabriel Magalhães',         photo: '',         nationality: 'Brazil',       age: 28, position: 'Defender',   clubIds: [42, 79] },
  { id: UID(), name: 'Reece James',               photo: '',         nationality: 'England',      age: 26, position: 'Defender',   clubIds: [49] },
  { id: UID(), name: 'Andrew Robertson',          photo: '',         nationality: 'Scotland',     age: 32, position: 'Defender',   clubIds: [40] },
  { id: UID(), name: 'Lisandro Martínez',         photo: '',         nationality: 'Argentina',    age: 28, position: 'Defender',   clubIds: [33, 194] },
  { id: UID(), name: 'Micky van de Ven',          photo: '',         nationality: 'Netherlands',  age: 25, position: 'Defender',   clubIds: [47] },
  { id: UID(), name: 'Ben White',                 photo: '',         nationality: 'England',      age: 28, position: 'Defender',   clubIds: [42, 51] },
  { id: UID(), name: 'Pau Torres',                photo: '',         nationality: 'Spain',        age: 29, position: 'Defender',   clubIds: [62, 533] },
  { id: UID(), name: 'Antonio Rüdiger',           photo: '',         nationality: 'Germany',      age: 33, position: 'Defender',   clubIds: [541, 49, 488] },
  { id: UID(), name: 'David Alaba',               photo: '',         nationality: 'Austria',      age: 33, position: 'Defender',   clubIds: [541, 157] },
  { id: UID(), name: 'Lucas Hernández',           photo: '',         nationality: 'France',       age: 30, position: 'Defender',   clubIds: [85, 157, 530] },
  { id: UID(), name: 'Caglar Soyuncu',            photo: '',         nationality: 'Turkey',       age: 29, position: 'Defender',   clubIds: [62, 46] },
  { id: UID(), name: 'Kieran Trippier',           photo: '',         nationality: 'England',      age: 35, position: 'Defender',   clubIds: [34, 530, 47] },
  { id: UID(), name: 'Sergiño Dest',              photo: '',         nationality: 'USA',          age: 25, position: 'Defender',   clubIds: [529, 489, 194] },
  { id: UID(), name: 'Ferdi Kadioglu',            photo: '',         nationality: 'Netherlands',  age: 25, position: 'Defender',   clubIds: [40] },
  { id: UID(), name: 'Eder Militão',              photo: '',         nationality: 'Brazil',       age: 27, position: 'Defender',   clubIds: [541, 212] },
  { id: UID(), name: 'Min-jae Kim',               photo: '',         nationality: 'South Korea',  age: 28, position: 'Defender',   clubIds: [157, 492] },
  { id: UID(), name: 'Cristian Romero',           photo: '',         nationality: 'Argentina',    age: 27, position: 'Defender',   clubIds: [47, 490, 496] },
  { id: UID(), name: 'Gvardiol',                  photo: '',         nationality: 'Croatia',      age: 23, position: 'Defender',   clubIds: [50, 167] },
  { id: UID(), name: 'Nuno Mendes',               photo: '',         nationality: 'Portugal',     age: 22, position: 'Defender',   clubIds: [85, 228] },
  { id: UID(), name: 'Pedro Porro',               photo: '',         nationality: 'Spain',        age: 26, position: 'Defender',   clubIds: [47, 228] },
  { id: UID(), name: 'Rico Lewis',                photo: '',         nationality: 'England',      age: 20, position: 'Defender',   clubIds: [50] },
  // ══════════════════════════════════════════
  // GOALKEEPERS
  // ══════════════════════════════════════════
  { id: UID(), name: 'Alisson',                   photo: '',         nationality: 'Brazil',       age: 33, position: 'Goalkeeper', clubIds: [40, 488] },
  { id: UID(), name: 'Thibaut Courtois',          photo: '',         nationality: 'Belgium',      age: 34, position: 'Goalkeeper', clubIds: [541, 49, 45] },
  { id: UID(), name: 'Ederson',                   photo: '',         nationality: 'Brazil',       age: 32, position: 'Goalkeeper', clubIds: [50, 211] },
  { id: UID(), name: 'Marc-André ter Stegen',     photo: '',         nationality: 'Germany',      age: 34, position: 'Goalkeeper', clubIds: [529] },
  { id: UID(), name: 'David de Gea',              photo: '',         nationality: 'Spain',        age: 35, position: 'Goalkeeper', clubIds: [33] },
  { id: UID(), name: 'Mike Maignan',              photo: '',         nationality: 'France',       age: 30, position: 'Goalkeeper', clubIds: [489, 79] },
  { id: UID(), name: 'Manuel Neuer',              photo: '',         nationality: 'Germany',      age: 40, position: 'Goalkeeper', clubIds: [157, 162] },
  { id: UID(), name: 'Gianluigi Donnarumma',      photo: '',         nationality: 'Italy',        age: 27, position: 'Goalkeeper', clubIds: [85, 489] },
  { id: UID(), name: 'André Onana',               photo: '',         nationality: 'Cameroon',     age: 30, position: 'Goalkeeper', clubIds: [33, 505, 194] },
  { id: UID(), name: 'Jordan Pickford',           photo: '',         nationality: 'England',      age: 32, position: 'Goalkeeper', clubIds: [45] },
  { id: UID(), name: 'Nick Pope',                 photo: '',         nationality: 'England',      age: 34, position: 'Goalkeeper', clubIds: [34] },
  { id: UID(), name: 'David Raya',                photo: '',         nationality: 'Spain',        age: 30, position: 'Goalkeeper', clubIds: [42, 55] },
  { id: UID(), name: 'Gregor Kobel',              photo: '',         nationality: 'Switzerland',  age: 28, position: 'Goalkeeper', clubIds: [165] },
  { id: UID(), name: 'Yann Sommer',               photo: '',         nationality: 'Switzerland',  age: 37, position: 'Goalkeeper', clubIds: [505, 157, 163] },
  { id: UID(), name: 'Emiliano Martínez',         photo: '',         nationality: 'Argentina',    age: 33, position: 'Goalkeeper', clubIds: [62, 42] },
  { id: UID(), name: 'Unai Simón',                photo: '',         nationality: 'Spain',        age: 27, position: 'Goalkeeper', clubIds: [165] },
  // ══════════════════════════════════════════
  // LEGENDS
  // ══════════════════════════════════════════
  { id: 10001, name: 'Ronaldinho',                photo: '',         nationality: 'Brazil',       age: 45, position: 'Attacker',   clubIds: [529, 489, 85] },
  { id: 10002, name: 'Thierry Henry',             photo: '',         nationality: 'France',       age: 48, position: 'Attacker',   clubIds: [42, 541, 496] },
  { id: 10003, name: 'Zlatan Ibrahimovic',        photo: '',         nationality: 'Sweden',       age: 44, position: 'Attacker',   clubIds: [489, 85, 505, 33, 529, 496] },
  { id: 10004, name: 'Wayne Rooney',              photo: '',         nationality: 'England',      age: 40, position: 'Attacker',   clubIds: [33, 45] },
  { id: 10005, name: 'Didier Drogba',             photo: '',         nationality: 'Ivory Coast',  age: 48, position: 'Attacker',   clubIds: [49, 81] },
  { id: 10006, name: 'Fernando Torres',           photo: '',         nationality: 'Spain',        age: 42, position: 'Attacker',   clubIds: [49, 40, 530] },
  { id: 10007, name: 'David Beckham',             photo: '',         nationality: 'England',      age: 51, position: 'Midfielder', clubIds: [85, 33, 541, 1610] },
  { id: 10008, name: 'Andrés Iniesta',            photo: '',         nationality: 'Spain',        age: 41, position: 'Midfielder', clubIds: [529] },
  { id: 10009, name: 'Xavi Hernández',            photo: '',         nationality: 'Spain',        age: 46, position: 'Midfielder', clubIds: [529] },
  { id: 10010, name: 'Steven Gerrard',            photo: '',         nationality: 'England',      age: 46, position: 'Midfielder', clubIds: [40] },
  { id: 10011, name: 'Frank Lampard',             photo: '',         nationality: 'England',      age: 47, position: 'Midfielder', clubIds: [49, 33] },
  { id: 10012, name: 'Patrick Vieira',            photo: '',         nationality: 'France',       age: 50, position: 'Midfielder', clubIds: [42, 505, 496] },
  { id: 10013, name: 'Zinedine Zidane',           photo: '',         nationality: 'France',       age: 54, position: 'Midfielder', clubIds: [541, 496] },
  { id: 10014, name: 'Paul Scholes',              photo: '',         nationality: 'England',      age: 51, position: 'Midfielder', clubIds: [33] },
  { id: 10015, name: 'Roy Keane',                 photo: '',         nationality: 'Ireland',      age: 54, position: 'Midfielder', clubIds: [33] },
  { id: 10016, name: 'Toni Kroos',                photo: '',         nationality: 'Germany',      age: 36, position: 'Midfielder', clubIds: [541, 157] },
  { id: 10017, name: 'John Terry',                photo: '',         nationality: 'England',      age: 45, position: 'Defender',   clubIds: [49, 62] },
  { id: 10018, name: 'Rio Ferdinand',             photo: '',         nationality: 'England',      age: 47, position: 'Defender',   clubIds: [33, 48] },
  { id: 10019, name: 'Nemanja Vidić',             photo: '',         nationality: 'Serbia',       age: 44, position: 'Defender',   clubIds: [33, 505] },
  { id: 10020, name: 'Paolo Maldini',             photo: '',         nationality: 'Italy',        age: 57, position: 'Defender',   clubIds: [489] },
  { id: 10021, name: 'Fabio Cannavaro',           photo: '',         nationality: 'Italy',        age: 52, position: 'Defender',   clubIds: [541, 496, 492] },
  { id: 10022, name: 'Roberto Carlos',            photo: '',         nationality: 'Brazil',       age: 53, position: 'Defender',   clubIds: [541] },
  { id: 10023, name: 'Carles Puyol',              photo: '',         nationality: 'Spain',        age: 47, position: 'Defender',   clubIds: [529] },
  { id: 10024, name: 'Raphaël Varane',            photo: '',         nationality: 'France',       age: 33, position: 'Defender',   clubIds: [33, 541] },
  { id: 10025, name: 'Peter Schmeichel',          photo: '',         nationality: 'Denmark',      age: 62, position: 'Goalkeeper', clubIds: [33] },
  { id: 10026, name: 'Gianluigi Buffon',          photo: '',         nationality: 'Italy',        age: 48, position: 'Goalkeeper', clubIds: [496, 85] },
  { id: 10027, name: 'Iker Casillas',             photo: '',         nationality: 'Spain',        age: 44, position: 'Goalkeeper', clubIds: [541, 212] },
]
