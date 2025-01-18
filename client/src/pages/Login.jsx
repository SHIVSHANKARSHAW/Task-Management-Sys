import React, { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../helpers/AxiosSetup";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/users/login", data);
      const { token } = response.data;
      localStorage.setItem("token", token); 
      toast.success("Login Successful");
      navigate("/home/dashboard");
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
    <>
      <div className="h-screen flex justify-center items-center ">
        <div className="w-[50%] max-w-md relative flex flex-col px-16 py-16 rounded-lg text-white backdrop-blur-xl">
          <div className="text-4xl font-bold mb-2 text-center">
            Welcome Back!
          </div>
          <div className="text-sm font-semibold mb-4 text-center ">
            Log in to your account
          </div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="block relative">
              <label
                htmlFor="email"
                className="block cursor-text text-sm leading-[140%] font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register("email", { required: true })}
                className="rounded border border-gray-200 text-md w-full font-bold leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px]"
              />
              {errors && <span className="text-red-500">Email is required</span>}
            </div>
            <div className="block relative">
              <label
                htmlFor="password"
                className="block cursor-text text-sm leading-[140%] font-semibold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", { required: true })}
                  className="rounded border border-gray-200 text-md w-full font-bold leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px]"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer outline-none text-black"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors && <span className="text-red-500">Password is required</span>}
            </div>
            <button
              type="submit"
              className="mt-6"
            >
              <Button content="Submit" />
            </button>
          </form>
          <div className="text-md text-center mt-[1.6rem]">
            Don’t have an account yet?{" "}
            <br />
            <Link to="/auth/signup" className="text-sm font-semibold text-[#7747ff]">
              Sign up for free!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;