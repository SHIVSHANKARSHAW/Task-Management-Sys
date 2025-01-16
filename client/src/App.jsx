import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import BGImg from "./assets/Bg-3.jpg";
import Login from "./pages/Login";
// import Loader from "./components/Loader";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BGImg})` }}
      >
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
