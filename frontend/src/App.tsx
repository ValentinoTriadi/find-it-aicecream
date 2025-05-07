import { Route, Routes } from "react-router-dom";

import "./App.css";
import ProtectedMenuLayout from "./layout/menu-layout";
import AchievementsPage from "./pages/achievement";
import BattleGame from "./pages/battle-game";
import BattlePage from "./pages/battle-map";
import ForgotPasswordPage from "./pages/forgot-password";
import LandingPage from "./pages/landing";
import LeaderboardPage from "./pages/leaderboard";
import LearnPage from "./pages/learn";
import LessonPage from "./pages/lesson";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import RegisterPage from "./pages/register";
import ResetPasswordPage from "./pages/reset-password";

function App() {
  return (
    <Routes>
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route element={<ProtectedMenuLayout />}>
        <Route path="/battle-map" element={<BattlePage />} />
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
