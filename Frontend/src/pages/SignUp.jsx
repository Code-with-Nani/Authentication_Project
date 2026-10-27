import React from "react";
import profile_icon from "../assets/images/profile_icon.png";

const SignUp = () => {
  return (
    <div className="bg-[#009578] w-full h-screen flex justify-center items-center">
      <div className="card max-w-82.5 h-[65%] bg-white/80 py-2 px-4 rounded-lg">
        <h1 className="text-2xl font-semibold text-center ">SignUp</h1>
        <form className="text-sm mt-10 flex flex-col gap-2">
          <div className="w-14 h-14 mb-2 border border-gray-600 rounded-full mx-auto  flex justify-center items-center cursor-pointer">
            <img src={profile_icon} alt="" className="w-9 h-9" />
          </div>
          <div className="flex justify-between items-center w-full">
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-500 px-2 py-1.5 outline-none rounded-sm w-[48%]"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-500 px-2 py-1.5 outline-none rounded-sm w-[48%]"
            />
          </div>
          <input
            type="text"
            placeholder="Email"
            className="border border-gray-500 px-2 py-1.5 outline-none rounded-sm"
          />
          <input
            type="text"
            placeholder="Password"
            className="border border-gray-500 px-2 py-1.5 outline-none rounded-sm"
          />
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-500 px-2 py-1.5 outline-none rounded-sm"
          />
          <button className="bg-[#009578] px-2 py-2 text-white font-medium text-[16px] rounded-sm cursor-pointer outline-none mt-5">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
