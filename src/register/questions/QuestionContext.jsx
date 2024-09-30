import React, { createContext, useState } from "react";

export const QuestionContext = createContext();

export const QuestionContextProvider = ({ children }) => {
  const [updateDetails, setUpdateDetails] = useState();
  const [updated, setUpdated] = useState(false);
  const [isList, setIsList] = useState(false);

  return (
    <QuestionContext.Provider
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
    </QuestionContext.Provider>
  );
};
