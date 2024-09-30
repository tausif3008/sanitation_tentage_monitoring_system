import React, { createContext, useState } from "react";

export const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [isListUpdateDetails, setIsListUpdateDetails] = useState({
    isList: false,
    updateDetails: false,
    updated: false,
  });

  return (
    <AssetContext.Provider
      value={{
        setIsListUpdateDetails,
        isListUpdateDetails,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};
