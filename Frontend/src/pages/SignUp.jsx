import React, { useContext, useRef, useState } from "react";
import profile_icon from "../assets/images/profile_icon.png";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const imgInp = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");

  const [frontendImg, setFrontendImg] = useState(profile_icon);
  const [backendImg, setBackendImg] = useState(null);

  const { serverURL } = useContext(dataContext);

  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("userName", userName);
  if (backendImg) {
    formData.append("profileImage", backendImg);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let data = await axios.post(serverURL + "/api/signup", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(data);
    } catch (error) {
      console.log("Error:", error.response?.data);
      console.log("Status:", error.response?.status);
    }
  };

  const handleImg = (e) => {
    let file = e.target.files[0];
    setBackendImg(file);

    let imgURL = URL.createObjectURL(file);
    setFrontendImg(imgURL);
  };

  return (
    <div className="bg-[#009578] w-full h-screen flex justify-center items-center">
      <div className="card max-w-82.5 h-[65%] bg-white py-2 px-4 rounded-lg">
        <h1 className="text-2xl font-semibold text-center ">SignUp</h1>
        <form
          onSubmit={handleSignUp}
          className="text-sm mt-8 flex flex-col gap-2"
        >
          <div
            onClick={() => {
              imgInp.current.click();
            }}
            className="relative w-14 h-14 mb-2 mx-auto cursor-pointer group"
          >
            <div className="w-full h-full border border-gray-600 rounded-full flex justify-center items-center overflow-hidden bg-white/50 group-hover:border-[#00897B] group-hover:bg-[#00897B]/10 transition-all">
              <img
                src={frontendImg}
                alt="Profile Preview"
                className={`${backendImg ? "w-full h-full" : "w-9 h-9"} object-cover`}
              />
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imgInp}
            onChange={handleImg}
          />
          <div className="flex justify-between items-center w-full">
            <input
              required
              type="text"
              placeholder="First Name"
              className="border border-gray-500 px-2 py-1.5 outline-none rounded-sm w-[48%]"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              className="border border-gray-500 px-2 py-1.5 outline-none rounded-sm w-[48%]"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
          <input
            required
            type="text"
            placeholder="Username"
            className="border border-gray-500 px-2 py-1.5 outline-none rounded-sm"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="bg-[#009578] px-2 py-2 text-white font-medium text-[16px] rounded-sm cursor-pointer outline-none mt-4">
            Sign Up
          </button>
          <p className="text-center mt-2">
            Already have a account?
            <span
              onClick={() => navigate("/login")}
              className="text-[#00897B] font-semibold hover:underline transition-all duration-200 text-[15px] cursor-pointer pl-2"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
