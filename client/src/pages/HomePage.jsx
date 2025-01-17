import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Body from "../components/Body";

const HomePage = () => {

  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center">
        {/* Navbar  */}
        <Navbar />
        {/* Body */}
        <div>
          <Body />
        </div>
      </div>
    </>
  );
};

export default HomePage;
