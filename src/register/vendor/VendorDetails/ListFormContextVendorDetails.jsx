import React, { createContext, useState } from "react";

export const ListFormContextVendorDetails = createContext();

export const ListFormProviderVendorDetails = ({ children }) => {
  const [updateDetails, setUpdateDetails] = useState();
  const [updated, setUpdated] = useState(false);
  const [isList, setIsList] = useState(false);

  return (
    <ListFormContextVendorDetails.Provider
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
    </ListFormContextVendorDetails.Provider>
  );
};
