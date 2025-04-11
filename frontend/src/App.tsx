import { Route, Routes } from 'react-router-dom';

import './App.css';
import LandingPage from './pages/landing';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import RegisterPage from './pages/register';
import AgoraVoiceCalling from './pages/voice';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/voice" element={<AgoraVoiceCalling />} />
    </Routes>
  );
}

export default App;
