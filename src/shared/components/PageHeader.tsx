import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

interface Props {
  title: string
  color?: string
  right?: React.ReactNode
}

export default function PageHeader({ title, color = '#E6EDF3', right }: Props) {
  const nav = useNavigate()
  return (
    <header className="flex items-center gap-3 px-4 py-4 border-b border-[#30363D]">
      <button
        onClick={() => nav('/')}
        className="p-2 -ml-2 rounded-xl text-[#8B949E] hover:text-white hover:bg-[#21262D] active:scale-90 transition-all"
      >
        <ChevronLeft size={22} />
      </button>
      <h1 className="flex-1 text-lg font-bold" style={{ color }}>{title}</h1>
      {right}
    </header>
  )
}
