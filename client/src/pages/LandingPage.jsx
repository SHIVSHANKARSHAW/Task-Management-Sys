import React, { useEffect } from "react";
import BgImg from "../assets/Bg-2.jpg";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen flex flex-col justify-center items-center text-white gap-10"
        style={{ backgroundImage: `url(${BgImg})` }}
      >
        <h1 className="font-bold text-9xl ">Superior</h1>
        <p className="text-4xl font-semibold mb-4">
          Your One Stop Task Management Web App
        </p>

        <Link to="/auth/login">
          <Button content="Get Started ➤" />
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
