import React from "react";
import img1 from "../assets/Images/goup.png";
import img3 from "../assets/Images/kumbh logo.png";

const NavHead = ({ lang, dict }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const currentDate = new Date().toLocaleDateString("en-GB", options); // Gets today's date in "Monday, 9 September 2024" format

  return (
    <div>
      <div className="bg-[#FF5F00] flex gap-4 justify-center md:justify-start col-span-1 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 justify-between md:w-11/12 mt-1 xl:w-10/12 2xl:w-9/12 m-auto mb-1">
          <span className="bg-[#EBECED] inline-block max-w-max p-[5px_15px] leading-none text-black text-[14px] rounded-lg py-[10px] px-[15px]">
            {currentDate}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 justify-between md:w-11/12 mt-2 xl:w-10/12 2xl:w-9/12 m-auto mb-2">
        <div className="flex gap-4 justify-center md:justify-start col-span-1">
          <img src={img1} className="h-20" alt="" />
          <img src={img3} className="h-20 flex md:hidden" alt="" />
        </div>

        <div className="text-center font-semibold text-xl w-full col-span-2 flex m-auto justify-center">
          <div className="flex flex-col">
            <div className="text-orange-500">{dict.title1[lang]}</div>
            <hr className="mt-1 mb-1 text-yellow-900" />
            <div className="text-green-800">{dict.title2[lang]}</div>
          </div>
        </div>
        <div className="flex justify-end items-center col-span-1">
          <img src={img3} className="h-20 hidden md:flex" alt="" />
        </div>
      </div>
    </div>
  );
};

export default NavHead;
