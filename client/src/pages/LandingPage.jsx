import React, { useEffect, useContext, useState } from "react";
import BgImg from "../assets/Bg-2.jpg";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import UserContext from "../context/ContextApi";
import Loader from "../components/Loader"; 

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = BgImg;
    img.onload = () => setLoading(false); 
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col justify-center items-center text-white gap-10"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      <h1 className="font-bold text-9xl ">TaskHive</h1>
      <p className="text-4xl font-semibold mb-4">
        Your One Stop Task Management Web App
      </p>
      {user === null ? (
        <Link to="/auth/login">
          <Button content="Get Started ➤" />
        </Link>
      ) : (
        <Link to="/home">
          <Button content="Get Started ➤" />
        </Link>
      )}
    </div>
  );
};

export default LandingPage;
