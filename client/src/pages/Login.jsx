import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="h-full flex justify-center items-center ">
        <div className="w-[50%] max-w-md relative flex flex-col px-16 py-16 rounded-lg text-white backdrop-blur-xl">
          <div className="text-4xl font-bold mb-2 text-center">
            Welcome Back !
          </div>
          <div className="text-sm font-semibold mb-4 text-center ">
            Log in to your account
          </div>
          <form className="flex flex-col gap-3">
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
                className="rounded border border-gray-200 text-md w-full font-bold leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px]"
              />
            </div>
            <div className="block relative">
              <label
                htmlFor="password"
                className="block cursor-text text-sm leading-[140%] font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                className="rounded border border-gray-200 text-md w-full font-bold leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px]"
              />
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
            <Link to = "/auth/signup" className="text-sm font-semibold text-[#7747ff]" >
              Sign up for free!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
