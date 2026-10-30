import React, { useContext, useState } from "react";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverURL, userData, setUserData, getUserData } =
    useContext(dataContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let data = await axios.post(
        serverURL + "/api/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      await getUserData();
      setUserData(data.data.user);

      navigate("/");
    } catch (error) {
      console.log("Error:", error.response?.data);
      console.log("Status:", error.response?.status);
    }
  };

  return (
    <div className="bg-[#009578] w-full h-screen flex justify-center items-center">
      <div className="card max-w-82.5 min-w-80 h-[49%] bg-white py-2 px-4 rounded-lg">
        <h1 className="text-2xl font-semibold text-center ">LogIn</h1>
        <form
          onSubmit={handleSignUp}
          className="text-sm mt-12 flex flex-col gap-2"
        >
          <input
            required
            type="email"
            placeholder="Email"
            className="border border-gray-500 px-2 py-1.5 outline-none rounded-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="border border-gray-500 px-2 py-1.5 outline-none rounded-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-[#009578] px-2 py-2 text-white font-medium text-[16px] rounded-sm cursor-pointer outline-none mt-8">
            Log In
          </button>
          <p className="text-center mt-4">
            Don't have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-[#00897B] font-semibold hover:underline text-[15px] cursor-pointer pl-2 transition-all duration-200"
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
