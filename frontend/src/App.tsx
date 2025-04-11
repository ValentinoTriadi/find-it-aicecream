import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import LandingPage from "./pages/landing";
import ProfilePage from "./pages/profile";

function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage/>} />
    <Route path="/" element={<LandingPage/>} />
    <Route path="/profile" element={<ProfilePage/>} />
  </Routes>
}

export default App;
