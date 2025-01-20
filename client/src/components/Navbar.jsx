import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "../helpers/AxiosSetup";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import UserContext from "../context/ContextApi";

const Navbar = () => {
  const profile =
    "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const submitHandler = async () => {
    try {
      localStorage.removeItem("token");
      const response = await axios.post("/users/logout");
      toast.success("Logged Out Successful");
      navigate("/auth/login");
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.message);
      } else if (error.request) {
        toast.error("Network Error: Could not reach the server");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <nav className="backdrop-blur-xl border-gray-200 w-[95%] mt-5 mb-5 rounded-lg shadow-xl">
      <div className="flex flex-wrap items-center justify-between mx-auto p-2">
        <div>
          {user & (user.access === "user") ? (
            <Link to="/home/dashboard" className="flex items-center space-x-3">
              <img src={logo} className="h-12 w-12 rounded-full " alt="Logo" />
              <span className="self-center text-4xl font-semibold whitespace-nowrap text-white">
                TaskHive
              </span>
            </Link>
          ) : (
            <Link
              to="/home/admin/dashboard"
              className="flex items-center space-x-3"
            >
              <img src={logo} className="h-12 w-12 rounded-full " alt="Logo" />
              <span className="self-center text-4xl font-semibold whitespace-nowrap text-white">
                TaskHive
              </span>
            </Link>
          )}
        </div>
        <div className="flex items-center gap-10">
          <div>
            <Link to="/home/profile" className="flex items-center space-x-3">
              <img
                src={profile}
                className="h-12 w-12 rounded-full"
                alt="Logo"
              />
            </Link>
          </div>
          <div>
            <button onClick={submitHandler}>
              <Button content="Logout" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
