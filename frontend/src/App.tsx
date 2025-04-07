// src/App.tsx
import { Routes, Route } from "react-router-dom"
import Landing from "./pages/landing"
import LeaderboardPage from "./pages/leaderboard"
import AchievementPage from "./pages/achievement"
import ProfilePage from "./pages/profile"
import LearnPage from "./pages/learn"
import LessonPage from "./pages/learn/[id]"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/achievement" element={<AchievementPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/learn/:id" element={<LessonPage />} />
    </Routes>
  )
}

export default App
