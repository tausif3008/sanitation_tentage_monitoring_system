import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Button } from "antd";
import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import { DICT } from "../urils/dictionary";

const items = (lang, dict) => {
  return [
    {
      key: "2",
      label: (
        <Link
          className="text-black no-underline hover:text-green"
          to="/user-registration"
        >
          User Registration
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          className="text-black no-underline"
          to="/register-found-person-form"
        >
          {dict.reg_found[lang]}
        </Link>
      ),
    },
  ];
};

const items3 = (lang, dict) => {
  return [
    {
      key: "6",
      label: (
        <Link
          className="text-black no-underline hover:text-green"
          to="/employee-registration"
        >
          {dict.emp_reg[lang]}
        </Link>
      ),
    },
    {
      key: "7",
      label: (
        <Link className="text-black no-underline" to="/citizen-registration">
          {dict.city_reg[lang]}
        </Link>
      ),
    },
  ];
};
const Navbar = ({ lang, setLang }) => {
  const dict = DICT;

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleNavigation = (link) => {
    navigate(link);
  };

  const [logName, setLogName] = useState(false);

  const loggedIn = localStorage.getItem("loggedIn");

  useEffect(() => {
    if (loggedIn) {
      setLogName(true);
    }
  }, []);

  const handleLang = () => {
    if (lang === "hi") {
      setLang("en");
    } else {
      setLang("hi");
    }
  };

  return (
    <div className="px-3 font-openSans">
      <div className="bg-orange-400  z-50 w-full flex items-center h-12 m-auto  justify-center ">
        <div className="hidden mt-0 lg:flex gap-5  bg-orange-400 justify-between items-center z-50 text-base font-semibold h-fit text-white md:w-11/12 xl:w-10/12 2xl:w-9/12 lg:text-base">
          <Link className="text-white no-underline " to="/dashboard">
            <div className="h-10 flex  items-center hover:bg-ec9 px-2">
              Dashboard{" "}
            </div>
          </Link>
          <Link
            to={"/welcome-to-lost-and-found-2025"}
            className="no-underline text-white"
          >
            <div className="h-10 flex  items-center hover:bg-ec9 px-2">
              {dict.home[lang]}
            </div>
          </Link>
          <div className="h-10 flex  items-center hover:bg-ec9 px-2">
            <DropDown
              items={items(lang, dict)}
              name={dict.register[lang]}
            ></DropDown>
          </div>

          {/* <div className="h-10 flex  items-center hover:bg-ec9 px-2">
            <div className="h-10 flex items-center">
              <DropDown
                items={items3(lang, dict)}
                name={dict.user_reg[lang]}
              ></DropDown>
            </div>
          </div> */}
          {/* 
          <div className="h-10 flex  items-center hover:bg-ec9 px-2">
            <DropDown
              items={items2(dict, lang)}
              name={dict.search[lang]}
            ></DropDown>
          </div>

          */}

          {/* <div className="h-10 flex  items-center hover:bg-ec9 px-2">
            {dict.notice_board[lang]}
          </div> */}

          {/* 
          <div className="h-10 flex  items-center hover:bg-ec9 px-2">
            Help
          </div>

          <div className="h-10 flex  items-center hover:bg-ec9 px-2">
            A / अ
          </div> */}

          {/* <div className="h-10 flex  items-center hover:bg-ec9 px-2">
            <div className="h-10 flex  items-center hover:bg-ec9 px-2">
              <DropDown
                items={items4(dict, lang)}
                name={dict.setting[lang]}
              ></DropDown>
            </div>
          </div> */}

          {/* {!logName ? (
            <button onClick={() => handleNavigation("/login")}>
              <div className="h-10 flex  items-center hover:bg-ec9 px-1">
                Login
              </div>
            </button>
          ) : (
            <div>
              <button
                onClick={() => {
                  localStorage.clear();
                  handleNavigation("/login");
                }}
              >
                <div className="h-10 flex  items-center hover:bg-ec9 px-3">
                  Logout
                </div>
              </button>
            </div>
          )} */}
        </div>

        <div className="flex w-10/12 m-auto justify-end lg:hidden">
          <Button
            className="flex lg:hidden bg-transparent border-none text-white"
            onClick={showDrawer}
          >
            <MenuOutlined></MenuOutlined>
          </Button>
        </div>

        <Drawer onClose={onClose} open={open}>
          <div className="text-base">
            <Link to={"/dashboard"} className="no-underline text-white">
              <div className="h-10  text-white font-semibold border-b flex items-center hover:bg-ec9 px-3 bg-04">
                Dashboard{" "}
              </div>
            </Link>
            <Link
              to={"/welcome-to-lost-and-found-2025"}
              className="no-underline text-white"
            >
              <div className="h-10  text-white font-semibold border-b flex items-center hover:bg-ec9 px-3 bg-04">
                {dict.home[lang]}
              </div>
            </Link>
            {/* 
            <div className="h-10  text-white font-semibold border-b flex items-center hover:bg-ec9 px-3 bg-04">
              {dict.help[lang]}
            </div> */}

            {/* 
            <button
              onClick={handleLang}
              className="h-10 w-full  text-white font-semibold border-b flex items-center hover:bg-ec9 px-3 bg-04"
            >
              A / अ{" "}
            </button> */}

            {!logName ? (
              <button onClick={() => handleNavigation("/login")}>
                <div className="h-10 flex items-center hover:bg-ec9 px-3 text-white font-semibold  ">
                  {dict.login[lang]}
                </div>
              </button>
            ) : (
              <div>
                <button
                  onClick={() => {
                    localStorage.clear();
                    handleNavigation("/login");
                  }}
                >
                  <div className="h-10 flex text-white font-semibold  items-center hover:bg-ec9 px-3">
                    {dict.logout[lang]}
                  </div>
                </button>
              </div>
            )}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
