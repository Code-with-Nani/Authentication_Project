import React, { useContext } from "react";
import { dataContext } from "../context/UserContext";
import axios from "axios";

const Home = () => {
  const { serverURL, userData, setUserData } = useContext(dataContext);

  const handleLogout = async () => {
    try {
      await axios.post(
        serverURL + "/api/logout",
        {},
        { withCredentials: true },
      );
      setUserData(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-black text-white flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <img
          className="w-14 h-14 rounded-full object-cover"
          src={userData.profileImage}
          alt=""
        />
        <p>
          Hello,{" "}
          <span className="text-green-500 font-semibold">
            {userData.firstName} {userData.lastName}
          </span>
          <br /> Welcome to Our Website.
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 outline-none rounded font-medium text-sm cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Home;
