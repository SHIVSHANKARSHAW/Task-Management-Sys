import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Body from "../components/Body";
import UserContext from "../context/ContextApi";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.access === "admin") {
        navigate("/home/admin/dashboard");
      } else {
        navigate("/home/dashboard");
      }
    } else {
      navigate("/auth/login");
    }
  }, [user]);

  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center">
        {/* Navbar */}
        <Navbar />
        {/* Body */}
        <div>
          <Body />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
