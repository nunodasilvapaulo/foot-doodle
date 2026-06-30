import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HubPage from './games/hub/HubPage'
import GridPage from './games/grid/GridPage'
import FootlePage from './games/footle/FootlePage'
import QuizPage from './games/quiz/QuizPage'
import ConnectionsPage from './games/connections/ConnectionsPage'
import LineupPage from './games/lineup/LineupPage'
import ChainPage from './games/chain/ChainPage'
import InstallBanner from './shared/components/InstallBanner'

export default function App() {
  return (
    <BrowserRouter>
      <InstallBanner />
      <Routes>
        <Route path="/" element={<HubPage />} />
        <Route path="/grid" element={<GridPage />} />
        <Route path="/footle" element={<FootlePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/connections" element={<ConnectionsPage />} />
        <Route path="/lineup" element={<LineupPage />} />
        <Route path="/chain" element={<ChainPage />} />
      </Routes>
    </BrowserRouter>
  )
}
