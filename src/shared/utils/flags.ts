const NATIONALITY_TO_CODE: Record<string, string> = {
  // Common footballing nations
  'England':        'GB-ENG',
  'Scotland':       'GB-SCT',
  'Wales':          'GB-WLS',
  'Ireland':        'IE',
  'France':         'FR',
  'Germany':        'DE',
  'Spain':          'ES',
  'Italy':          'IT',
  'Portugal':       'PT',
  'Netherlands':    'NL',
  'Belgium':        'BE',
  'Brazil':         'BR',
  'Argentina':      'AR',
  'Uruguay':        'UY',
  'Colombia':       'CO',
  'Chile':          'CL',
  'Mexico':         'MX',
  'USA':            'US',
  'Canada':         'CA',
  'Norway':         'NO',
  'Sweden':         'SE',
  'Denmark':        'DK',
  'Finland':        'FI',
  'Switzerland':    'CH',
  'Austria':        'AT',
  'Croatia':        'HR',
  'Serbia':         'RS',
  'Poland':         'PL',
  'Czech Republic': 'CZ',
  'Slovakia':       'SK',
  'Hungary':        'HU',
  'Romania':        'RO',
  'Greece':         'GR',
  'Turkey':         'TR',
  'Russia':         'RU',
  'Ukraine':        'UA',
  'Morocco':        'MA',
  'Senegal':        'SN',
  'Nigeria':        'NG',
  'Ghana':          'GH',
  'Ivory Coast':    'CI',
  'Cameroon':       'CM',
  'Egypt':          'EG',
  'Algeria':        'DZ',
  'Tunisia':        'TN',
  'South Korea':    'KR',
  'Japan':          'JP',
  'Australia':      'AU',
  'New Zealand':    'NZ',
  'Saudi Arabia':   'SA',
  'Iran':           'IR',
  'China':          'CN',
  'Trinidad':       'TT',
  'Jamaica':        'JM',
  'Costa Rica':     'CR',
  'Ecuador':        'EC',
  'Paraguay':       'PY',
  'Bolivia':        'BO',
  'Peru':           'PE',
  'Venezuela':      'VE',
  'North Macedonia':'MK',
  'Albania':        'AL',
  'Bosnia':         'BA',
  'Slovenia':       'SI',
  'Israel':         'IL',
  'Montenegro':     'ME',
}

/** Returns a flag emoji for a nationality string, or a football if unknown */
export function getFlag(nationality: string): string {
  const code = NATIONALITY_TO_CODE[nationality]
  if (!code) return '🏴'

  // Handle GB subdivisions differently (they don't have standard Unicode flag sequences)
  if (code === 'GB-ENG') return '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
  if (code === 'GB-SCT') return '🏴󠁧󠁢󠁳󠁣󠁴󠁿'
  if (code === 'GB-WLS') return '🏴󠁧󠁢󠁷󠁬󠁳󠁿'

  // Standard ISO two-letter flag emoji
  return code.toUpperCase().replace(/[A-Z]/g, c =>
    String.fromCodePoint(127397 + c.charCodeAt(0))
  )
}
