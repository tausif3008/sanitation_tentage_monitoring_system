import React from "react";

const CopyWrite = ({ dict, lang }) => {
  return (
    <footer className="h-12 w-full flex items-center text-center justify-center bg-teal-950 text-d4 mt-auto">
      <div className="md:w-10/12 w-9/12 xl:w-10/12 2xl:w-9/12 text-sm flex justify-center m-auto">
        {dict.last_footer[lang]}
      </div>
    </footer>
  );
};

export default CopyWrite;
