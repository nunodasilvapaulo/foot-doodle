import { RotateCcw, Share2, X } from 'lucide-react'

interface Props {
  won: boolean
  title: string
  message: string
  shareText?: string
  onPlayAgain: () => void
  onClose: () => void
}

export default function GameResultModal({ won, title, message, shareText, onPlayAgain, onClose }: Props) {
  async function share() {
    const text = shareText ?? `${title}\n${message}`
    if (navigator.share) {
      await navigator.share({ text })
    } else {
      await navigator.clipboard.writeText(text)
      alert('Copied to clipboard!')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden shadow-2xl">
        <div className={`p-6 text-center space-y-2 ${won ? 'bg-[#238636]/20' : 'bg-red-900/20'}`}>
          <div className="text-5xl">{won ? '🏆' : '😔'}</div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-[#8B949E] text-sm">{message}</p>
        </div>

        <div className="p-4 space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full flex items-center justify-center gap-2 bg-[#238636] hover:bg-[#2EA043] active:scale-95 text-white font-semibold rounded-xl py-3 transition-all"
          >
            <RotateCcw size={18} />
            Play Again
          </button>

          {shareText && (
            <button
              onClick={share}
              className="w-full flex items-center justify-center gap-2 bg-[#21262D] hover:bg-[#30363D] active:scale-95 text-white font-medium rounded-xl py-3 transition-all"
            >
              <Share2 size={18} />
              Share Result
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 text-[#8B949E] hover:text-white py-2 transition-colors"
          >
            <X size={16} />
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
