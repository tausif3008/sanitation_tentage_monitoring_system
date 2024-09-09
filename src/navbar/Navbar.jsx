import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Button } from "antd";
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import { DICT } from "../urils/dictionary";

const register_items = (lang, dict) => {
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
        <Link className="text-black no-underline" to="/asset-list">
          Asset Registration
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link className="text-black no-underline" to="/gis-services">
          GIS Services
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link className="text-black no-underline" to="/gps-fleet-registration">
          GPS Fleet Registration
        </Link>
      ),
    },

    {
      key: "6",
      label: (
        <Link className="text-black no-underline" to="/vendor-registration">
          Vendor Registration
        </Link>
      ),
    },

    {
      key: "7",
      label: (
        <Link className="text-black no-underline" to="/vehicle-registration">
          Vehicle Registration
        </Link>
      ),
    },
  ];
};

const assignment_items = (lang, dict) => {
  return [
    {
      key: "3",
      label: (
        <Link className="text-black no-underline" to="/asset-allotment">
          Asset Allotment
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Link
          className="text-black no-underline hover:text-green"
          to="/manpower-assignment"
        >
          Manpower Assignment
        </Link>
      ),
    },
  ];
};

const schedule_items = (lang, dict) => {
  return [
    // {
    //   key: "1",
    //   label: (
    //     <Link
    //       className="text-black no-underline hover:text-green"
    //       to="/scheduling-and-deployment"
    //     >
    //       Create
    //     </Link>
    //   ),
    // },
    {
      key: "2",
      label: (
        <Link
          className="text-black no-underline hover:text-green"
          to="/waste-management-schedule"
        >
          Waste Management Schedule
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link className="text-black no-underline" to="/create-tentage-schedule">
          Tentage Management Schedule
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link
          className="text-black no-underline"
          to="/create-sanitation-schedule"
        >
          Sanitation Management Schedule
        </Link>
      ),
    },
  ];
};

const complaince_items = (lang, dict) => {
  return [
    {
      key: "2",
      label: (
        <Link
          className="text-black no-underline hover:text-green"
          to="/monitoring"
        >
          Monitoring
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link className="text-black no-underline" to="/notification">
          Notification
        </Link>
      ),
    },
  ];
};

const waste_items = (lang, dict) => {
  return [
    {
      key: "2",
      label: (
        <Link className="text-black no-underline hover:text-green" to="/route">
          Route
        </Link>
      ),
    },
  ];
};

const reports_items = (lang, dict) => {
  return [
    {
      key: "2",
      label: (
        <Link className="text-black no-underline hover:text-green" to="/#">
          Report 1
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link className="text-black no-underline" to="/#">
          Report 2
        </Link>
      ),
    },
  ];
};

const setting_item = (dict, lang) => {
  return [
    {
      key: "1",
      label: (
        <Link className="text-black no-underline hover:text-green" to="/">
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link className="text-black no-underline hover:text-green" to="/">
          {dict.help[lang]}
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
    <div className="">
      <div className="z-50 w-full flex items-center h-12 m-auto  ">
        <div className="hidden mt-0 lg:flex gap-1 justify-between items-center z-50 text-black font-semibold h-fit text-sm md:w-11/12 xl:w-10/12 2xl:w-9/12 lg:text-black">
          {/* <Link to={"/home"} className="no-underline text-black">
            <div className="h-10 flex  items-center  px-2">
              {dict.home[lang]}
            </div>
          </Link> */}

          <Link className="text-black no-underline " to="/dashboard">
            <div className="h-10 flex  items-center  px-2">
              Dashboard{" "}
            </div>
          </Link>

          <div className="h-10 flex  items-center  px-2">
            <DropDown
              className="text-black"
              items={register_items(lang, dict)}
              // name={dict.register[lang]}
              name="Register"
            ></DropDown>
          </div>

          <div className="h-10 flex  items-center  px-2">
            <DropDown
              items={assignment_items(lang, dict)}
              name="Assignment"
            ></DropDown>
          </div>

          <div className="h-10 flex  items-center  px-2">
            <DropDown
              items={schedule_items(lang, dict)}
              name="Schedule"
            ></DropDown>
          </div>

          <div className="h-10 flex  items-center  px-2">
            <DropDown
              items={complaince_items(lang, dict)}
              name="Complaince"
            ></DropDown>
          </div>

          <div className="h-10 flex  items-center  px-2">
            <DropDown
              items={reports_items(lang, dict)}
              name="Reports"
            ></DropDown>
          </div>

          {/* <div className="h-10 flex  items-center  px-2">
            <DropDown
              items={waste_items(lang, dict)}
              name="Waste Management"
            ></DropDown>
          </div> */}

          {/* <div className="h-10 flex  items-center  px-2">
            <div className="h-10 flex  items-center  px-2">
              <DropDown
                items={setting_item(dict, lang)}
                name={dict.setting[lang]}
              ></DropDown>
            </div>
          </div> */}

          {/* {!logName ? (
            <button onClick={() => handleNavigation("/login")}>
              <div className="h-10 flex  items-center  px-1">
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
                <div className="h-10 flex  items-center  px-3">
                  Logout
                </div>
              </button>
            </div>
          )} */}
        </div>

        <div className="flex w-10/12 m-auto justify-end lg:hidden">
          <Button
            className="flex lg:hidden bg-transparent border-none text-black"
            onClick={showDrawer}
          >
            <MenuOutlined></MenuOutlined>
          </Button>
        </div>

        <Drawer onClose={onClose} open={open}>
          <div className="text-black">
            <Link to={"/dashboard"} className="no-underline text-black">
              <div className="h-10  text-black font-semibold border-b flex items-center  px-3 bg-04">
                Dashboard{" "}
              </div>
            </Link>
            <Link to={"/home"} className="no-underline text-black">
              <div className="h-10  text-black font-semibold border-b flex items-center  px-3 bg-04">
                {dict.home[lang]}
              </div>
            </Link>

            <div className="h-10  text-black font-semibold border-b flex items-center  px-3 bg-04">
              <DropDown
                className="text-black"
                items={register_items(lang, dict)}
                name={dict.register[lang]}
              ></DropDown>
            </div>

            <div className="h-10  text-black font-semibold border-b flex items-center  px-3 bg-04">
              <DropDown
                className="text-black"
                items={assignment_items(lang, dict)}
                name="Assignment"
              ></DropDown>
            </div>

            <div className="h-10  text-black font-semibold border-b flex items-center  px-3 bg-04">
              <DropDown
                items={schedule_items(lang, dict)}
                name="Schedule"
              ></DropDown>
            </div>

            <div className="h-10  text-black font-semibold border-b flex items-center  px-3 bg-04">
              <DropDown
                items={complaince_items(lang, dict)}
                name="Complaince"
              ></DropDown>
            </div>

            {/* <div className="h-10 flex  items-center  px-2">
            <DropDown
              items={waste_items(lang, dict)}
              name="Waste Management"
            ></DropDown>
          </div> */}

            {/* <div className="h-10  text-black font-semibold border-b flex items-center  px-3 bg-04">
              \{" "}
              <DropDown
                items={setting_item(dict, lang)}
                name={dict.setting[lang]}
              ></DropDown>
            </div> */}
            {/* 
            <div className="h-10  text-black font-semibold border-b flex items-center  px-3 bg-04">
              {dict.help[lang]}
            </div> */}

            {/* 
            <button
              onClick={handleLang}
              className="h-10 w-full  text-black font-semibold border-b flex items-center  px-3 bg-04"
            >
              A / अ{" "}
            </button> */}

            {/* {!logName ? (
              <button onClick={() => handleNavigation("/login")}>
                <div className="h-10 flex items-center  px-3 text-black font-semibold  ">
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
                  <div className="h-10 flex text-black font-semibold  items-center  px-3">
                    {dict.logout[lang]}
                  </div>
                </button>
              </div>
            )} */}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
