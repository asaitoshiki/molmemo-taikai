import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { GamePage } from './pages/GamePage'
import { TimelinePage } from './pages/TimelinePage'
import { TeamNamesPage } from './pages/TeamNamesPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { EventCourtPage } from './pages/EventCourtPage'
import { EventHostSetupPage } from './pages/EventHostSetupPage'
import { EventHqPage } from './pages/EventHqPage'
import { TournamentDetailPage } from './pages/TournamentDetailPage'
import { TournamentSetupPage } from './pages/TournamentSetupPage'
import { TournamentsPage } from './pages/TournamentsPage'
import { useSharePurge } from './sync/useSharePurge'

export const App = () => {
  useSharePurge()

  return (
    <Routes>
      {/* 試合画面はスコア入力に集中させたいのでレイアウトの外に置く */}
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/e/:eventId" element={<EventCourtPage />} />
      <Route path="/e/:eventId/hq" element={<EventHqPage />} />
      <Route path="/games/:gameId" element={<GamePage />} />
      <Route path="/games/:gameId/timeline" element={<TimelinePage />} />
      <Route path="/games/:gameId/teams" element={<TeamNamesPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<TournamentsPage />} />
        <Route path="/tournaments/new" element={<TournamentSetupPage />} />
        <Route path="/hq/new" element={<EventHostSetupPage />} />
        <Route path="/tournaments/:tournamentId" element={<TournamentDetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
