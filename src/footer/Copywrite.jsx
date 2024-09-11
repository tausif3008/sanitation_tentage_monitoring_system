import React from "react";
import { DICT } from "../urils/dictionary";

const CopyWrite = ({ lang = "en" }) => {
  const dict = DICT;
  return (
    <footer className="h-12 w-full flex items-center text-center justify-center bg-orange-400 text-white font-semibold font-roboto">
      <div className="md:w-10/12 w-9/12 xl:w-10/12 2xl:w-9/12 text- flex items-center justify-center m-auto">
        {dict.last_footer[lang]}
      </div>
    </footer>
  );
};

export default CopyWrite;
