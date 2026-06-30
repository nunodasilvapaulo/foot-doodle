import { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(
    () => !!localStorage.getItem('ft_install_dismissed')
  )

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!prompt || dismissed) return null

  async function install() {
    await prompt!.prompt()
    const { outcome } = await prompt!.userChoice
    if (outcome === 'accepted') setPrompt(null)
  }

  function dismiss() {
    setDismissed(true)
    localStorage.setItem('ft_install_dismissed', '1')
  }

  return (
    <div className="flex items-center gap-3 bg-[#161B22] border-b border-[#30363D] px-4 py-3">
      <Download size={18} className="text-[#58A6FF] shrink-0" />
      <p className="flex-1 text-sm text-[#E6EDF3]">
        Add Football Trivia to your home screen for the full app experience.
      </p>
      <button
        onClick={install}
        className="bg-[#238636] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shrink-0"
      >
        Install
      </button>
      <button onClick={dismiss} className="text-[#8B949E]">
        <X size={18} />
      </button>
    </div>
  )
}
