import React, { createContext, useState } from "react";

export const ListFormContextUser = createContext();

export const ListFormProviderUser = ({ children }) => {
  const [updateDetails, setUpdateDetails] = useState();
  const [updated, setUpdated] = useState(false);
  const [isList, setIsList] = useState(false);

  return (
    <ListFormContextUser.Provider
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
    </ListFormContextUser.Provider>
  );
};
