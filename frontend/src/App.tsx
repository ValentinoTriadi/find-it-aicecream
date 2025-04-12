import { Route, Routes } from 'react-router-dom';

import './App.css';
import ProtectedMenuLayout from './layout/menu-layout';
import BattlePage from './pages/battle-map';
import LandingPage from './pages/landing';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import BattleGame from './pages/battle-game';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route element={<ProtectedMenuLayout />}>
        <Route path="/battle-map" element={<BattlePage />} />
      </Route>
      <Route path="/battle/:topicId" element={<BattleGame />} />
    </Routes>
  );
}

export default App;
