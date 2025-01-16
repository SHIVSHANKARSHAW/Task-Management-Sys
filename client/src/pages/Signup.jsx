import React, { useState } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../helpers/AxiosSetup";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const { register, handleSubmit, errors } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/user/new", data);

      console.log("User created successfully:", response.data);

      toast.success("User Created Succesfully")

    } catch (error) {
      console.error("Error creating user:", error.response.data);
      toast.error("Error : ",error.response.data);
    }
  };

  return (
    <>
      <div className="h-full flex justify-center items-center ">
        <div className="w-[50%] max-w-md  relative flex flex-col px-16 py-16 rounded-lg text-white backdrop-blur-xl">
          <div className="text-4xl font-bold mb-2 text-center">
            Welcome!
          </div>
          <div className="text-sm font-semibold mb-4 text-center ">
            Sign Up to create to your account
          </div>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="block relative">
              <label
                htmlFor="username"
                className="block cursor-text text-sm leading-[140%] font-semibold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username", { required: true })}
                className="rounded border border-gray-200 text-md w-full font-bold leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px]"
              />
              {errors && <span className="text-red-500">Username is required</span>}
            </div>
            <div className="block relative">
              <label
                htmlFor="email"
                className="block  cursor-text text-sm  leading-[140%] font-semibold mb-2"
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
            Already have an account ?{" "}
            <br />
            <Link to="/auth/login" className="text-sm font-semibold text-[#7747ff]">
              Log in to your account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
