import { Route, Routes } from 'react-router-dom';

import './App.css';
import { BattleMapProvider } from './context/battle-map.context';
import { BattleMapLayout } from './layout/battle-map-layout';
import ProtectedMenuLayout from './layout/menu-layout';
import AchievementsPage from './pages/achievement';
import BattleGame from './pages/battle-game';
import BattlePage from './pages/battle-map';
import LandingPage from './pages/landing';
import LeaderboardPage from './pages/leaderboard';
import LearnPage from './pages/learn';
import LessonPage from './pages/lesson';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import RegisterPage from './pages/register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route element={<ProtectedMenuLayout />}>
        <Route element={<BattleMapLayout />}>
          <Route path="/battle-map" element={<BattlePage />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/:id" element={<LessonPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
      </Route>
      <Route
        path="/battle/:roomId/:topicId/:subtopicId"
        element={<BattleGame />}
      />
    </Routes>
  );
}

export default App;
