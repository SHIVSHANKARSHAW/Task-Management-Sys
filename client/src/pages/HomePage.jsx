import React from "react";
import Navbar from "../components/Navbar";
import Body from "../components/Body";

const HomePage = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col items-center">
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
