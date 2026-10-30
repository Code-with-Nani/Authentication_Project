import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import { dataContext } from "./context/UserContext";

const App = () => {
  const { userData } = useContext(dataContext);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </>
  );
};

export default App;
