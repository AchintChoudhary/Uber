import React, { useState, createContext } from "react";

// ✅ Create the context
export const CaptainDataContext = createContext();

// ✅ Create the provider
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      type: "",
    },
  });

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
