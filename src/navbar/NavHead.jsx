import React from "react";
import img1 from "../assets/Images/goup.png";
import img3 from "../assets/Images/kumbh logo.png";

const NavHead = ({ lang, dict }) => {
  return (
    <div className="relative top-0 mx-3">
      <div className="font-merriweather flex lg:grid grid-cols-1 md:grid-cols-4 justify-between w-full m-auto mb-2 h-20">
        <div className="gap-4 justify-center md:justify-start col-span-1 hidden lg:flex">
          <img src={img1} className="h-20" alt="" />
        </div>

        <div className="text-center font-semibold text-xl w-full col-span-2 flex m-auto justify-center">
          <div className="flex flex-col">
            <div className="text-orange-500">{dict.title1[lang]}</div>
            <hr className="mt-1 mb-1 text-yellow-900" />
            <div className="text-green-800">{dict.title2[lang]}</div>
          </div>
        </div>
        <div className="justify-end items-center col-span-1 hidden lg:flex">
          <img src={img3} className="h-20 hidden md:flex" alt="" />
        </div>
      </div>
    </div>
  );
};

export default NavHead;
