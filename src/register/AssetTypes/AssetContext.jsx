import React, { createContext, useState } from "react";

export const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [updateDetails, setUpdateDetails] = useState();
  const [updated, setUpdated] = useState(false);
  const [isList, setIsList] = useState(false);

  return (
    <AssetContext.Provider
      value={{
        updateDetails,
        setUpdateDetails,
        updated,
        setUpdated,
        isList,
        setIsList,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};
