import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const dataContext = createContext();

const UserContext = ({ children }) => {
  const serverURL = import.meta.env.VITE_API_URL;

  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const { data } = await axios.get(serverURL + "/api/getUserData", {
        withCredentials: true,
      });
      setUserData(data.user);
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const data = {
    serverURL,
    userData,
    setUserData,
    getUserData,
  };

  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
};

export default UserContext;
