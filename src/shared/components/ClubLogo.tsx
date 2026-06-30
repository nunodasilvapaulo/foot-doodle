import { useState } from 'react'

interface Props {
  name: string
  logo?: string
  size?: number
  className?: string
}

const COLORS = ['#F78166','#3FB950','#D2A8FF','#FFA657','#58A6FF','#FF7B72','#E3B341']

function colorFor(name: string) {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff
  return COLORS[Math.abs(h) % COLORS.length]
}

function abbr(name: string) {
  const words = name.replace(/^(FC|AC|RC|SC|AS|CD|UD|RCD|CF|SL)\s/i, '').trim().split(/\s+/)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export default function ClubLogo({ name, logo, size = 32, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  const style = { width: size, height: size, minWidth: size }

  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt={name}
        style={style}
        className={`object-contain ${className}`}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    )
  }

  const bg = colorFor(name)
  return (
    <div
      style={{ ...style, background: `${bg}20`, borderColor: `${bg}50`, fontSize: size * 0.38 }}
      className={`rounded-lg border-2 flex items-center justify-center font-bold text-white shrink-0 ${className}`}
    >
      {abbr(name)}
    </div>
  )
}
