import React, { createContext, useState } from "react";

export const ListFormContextVendor = createContext();

export const ListFormProviderVendor = ({ children }) => {
  const [updateDetails, setUpdateDetails] = useState();
  const [updated, setUpdated] = useState(false);
  const [isList, setIsList] = useState(false);

  return (
    <ListFormContextVendor.Provider
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
    </ListFormContextVendor.Provider>
  );
};
