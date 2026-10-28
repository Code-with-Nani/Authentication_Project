import React, { createContext } from "react";

export const dataContext = createContext();

const UserContext = ({ children }) => {
  const serverURL = "http://localhost:3000";

  const data = {
    serverURL,
  };

  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
};

export default UserContext;
