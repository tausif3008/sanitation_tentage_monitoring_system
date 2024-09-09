import React, { useState } from "react";
import img1 from "../assets/Images/goup.png";
import img3 from "../assets/Images/kumbh logo.png";
import { Icon } from "@iconify/react";
import Navbar from "./Navbar";

const NavHead = ({ lang, dict, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const currentDate = new Date().toLocaleDateString("en-GB", options);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearchDropdown = () => {
    setSearchOpen(!searchOpen);
  };

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setIsOpen(false);
  };

  // Sample data for search results
  const data = [
    "Kumbh Mela",
    "Kumbh Festival",
    "Ganga River",
    "Pilgrimage",
    "Holy Bath",
  ];

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    if (searchValue) {
      const filteredResults = data.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <div className="bg-[#FF5F00] flex gap-4 justify-center md:justify-start col-span-1 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 justify-between md:w-11/12 mt-1 xl:w-10/12 2xl:w-9/12 m-auto mb-1">
          <span className="bg-[#EBECED] inline-block max-w-max p-[5px_15px] leading-none text-black text-[14px] rounded-lg py-[6px] px-[15px] flex items-center">
            <Icon
              icon="lets-icons:date-today"
              className="mr-1"
              width="20"
              height="20"
            />{" "}
            {currentDate}{" "}
          </span>

          <h3 className="text-center mb-0">Kumbh Mela 2025</h3>

          <div className="flex justify-end">
            <div className="relative max-w-max">
              <button
                onClick={toggleDropdown}
                className="bg-[#EBECED] inline-block  p-[5px_15px] leading-none text-black text-[18px] rounded-lg py-[6px] px-[15px] flex items-center"
              >
                {lang === "en" ? "Eng" : lang === "hi" ? "Hin" : "Mar"}
                <Icon
                  icon="ic:round-arrow-drop-down"
                  width="24"
                  height="24"
                  className="text-[#FF3B30]"
                />
              </button>

              {/* Language Dropdown content */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[99]">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={() => handleLangChange("en")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 size-full text-start"
                      role="menuitem"
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLangChange("hi")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 size-full text-start"
                      role="menuitem"
                    >
                      Hindi
                    </button>
                    <button
                      onClick={() => handleLangChange("mr")}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 size-full text-start"
                      role="menuitem"
                    >
                      Marathi
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative mx-2">
              <button
                onClick={toggleSearchDropdown}
                className="bg-[#EBECED] inline-block  p-[5px_15px] leading-none text-black text-[14px] rounded-lg py-[5px] px-[5px] flex items-center w-[36px] h-[36px] flex align-middle justify-center"
              >
                <Icon icon="icon-park-outline:search" width="28" height="28" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[99]">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="block w-full px-4 py-2 text-sm text-gray-700 border-b border-gray-300 focus:outline-none"
                  />
                  <div className="max-h-40 overflow-y-auto">
                    {results.map((result, index) => (
                      <a
                        href="#"
                        key={index}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {result}
                      </a>
                    ))}
                    {results.length === 0 && (
                      <p className="px-4 py-2 text-sm text-gray-500">
                        No results found.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button className="mr-2">Help</button>

            <a href="#" target="" className="relative">
              <span className="bg-[#EBECED] inline-block  p-[5px_15px] leading-none text-black text-[14px] rounded-lg py-[5px] px-[5px] flex items-center w-[36px] h-[36px] flex align-middle justify-center">
                <Icon
                  icon="ph:bell"
                  className="text-black"
                  width="28"
                  height="28"
                />
              </span>
              <span className="absolute w-[5px] h-[5px] bg-[#ff5f00] top-[5px] right-[5px] rounded"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Remaining structure */}
      <div className="grid grid-cols-1 md:grid-cols-1 justify-between md:w-11/12 mt-2 xl:w-10/12 2xl:w-9/12 m-auto mb-2">
        <div className="flex items-center">
          <div className="col-md-5">
            {" "}
            <div className="flex gap-4 justify-center md:justify-start col-span-1">
              <img src={img1} className="h-20" alt="" />{" "}
              <div className="text-[#FF9500]">{dict.title2[lang]}</div>
              {/* <img src={img3} className="h-20 flex md:hidden" alt="" /> */}
            </div>
          </div>
          <div className="col-md-7">
            {" "}
            <div className="flex justify-end w-full">
              <Navbar></Navbar>
            </div>
          </div>
        </div>

        {/* <div className="text-center font-semibold text-xl w-full col-span-2 flex m-auto justify-center">
          <div className="flex flex-col">
            <div className="text-orange-500">{dict.title1[lang]}</div>
            <hr className="mt-1 mb-1 text-yellow-900" />
            <div className="text-green-800">{dict.title2[lang]}</div>
          </div>
        </div> */}
        {/* <div className="flex justify-end items-center col-span-1">
          <img src={img3} className="h-20 hidden md:flex" alt="" />
        </div> */}
      </div>
    </div>
  );
};

export default NavHead;
