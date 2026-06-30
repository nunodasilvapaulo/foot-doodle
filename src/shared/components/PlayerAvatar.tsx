import { useState } from 'react'

interface Props {
  name: string
  photo?: string
  size?: number   // px
  className?: string
}

const COLORS = [
  '#F78166', '#3FB950', '#D2A8FF', '#FFA657',
  '#58A6FF', '#FF7B72', '#E3B341', '#79C0FF',
]

function colorFor(name: string) {
  let hash = 0
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff
  return COLORS[Math.abs(hash) % COLORS.length]
}

function initials(name: string) {
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function PlayerAvatar({ name, photo, size = 40, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  const bg = colorFor(name)
  const style = { width: size, height: size, minWidth: size }

  if (photo && !failed) {
    return (
      <img
        src={photo}
        alt={name}
        style={style}
        className={`rounded-full object-cover bg-[#21262D] ${className}`}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    )
  }

  return (
    <div
      style={{ ...style, background: `${bg}25`, borderColor: `${bg}60`, fontSize: size * 0.38 }}
      className={`rounded-full border-2 flex items-center justify-center font-bold text-white shrink-0 ${className}`}
    >
      {initials(name)}
    </div>
  )
}
