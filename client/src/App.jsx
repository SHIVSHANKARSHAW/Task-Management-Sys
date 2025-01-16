import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import BGImg from "./assets/Bg-3.jpg";
import Login from "./pages/Login";
import Loader from "./components/Loader";
import Signup from "./pages/Signup";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <div className="bg-cover bg-center bg-no-repeat h-screen" style={{backgroundImage: `url(${BGImg})`}}>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
