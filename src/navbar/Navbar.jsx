import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Button } from "antd";
import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import { DICT } from "../urils/dictionary";
import img1 from "../assets/Images/goup.png";
import { logoutFetch } from "../Fetch/Axios";

const register_items = (lang, dict) => {
  return [
    {
      key: "2",
      label: (
        <Link className="text-black no-underline hover:text-green" to="/users">
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
        <Link className="text-black no-underline" to="/asset-type-list">
          Asset Type Registration
        </Link>
      ),
    },
    {
      key: "7",
      label: (
        <Link className="text-black no-underline" to="/vendor">
          Vendor Registration
        </Link>
      ),
    },
    {
      key: "8",
      label: (
        <Link className="text-black no-underline" to="/vehicle-registration">
          Vehicle Registration
        </Link>
      ),
    },
    {
      key: "9",
      label: (
        <Link className="text-black no-underline" to="/questions">
          Question Registration
        </Link>
      ),
    },
  ];
};

const dashboards = (lang, dict) => {
  return [
    {
      key: "2",
      label: (
        <Link
          className="text-black no-underline hover:text-green"
          to="/dashboard"
        >
          Sanitation Dashboard
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          className="text-black no-underline hover:text-green"
          to="/tentage-dashboard"
        >
          Tentage Dashboard
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link
          className="text-black no-underline hover:text-green"
          to="/waste-dashboard"
        >
          Waste Dashboard
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link
          className="text-black no-underline hover:text-green"
          to="/incident-dashboard"
        >
          Incident Dashboard
        </Link>
      ),
    },
    {
      key: "6",
      label: (
        <Link
          className="text-black no-underline hover:text-green"
          to="/DMS-dashboard"
        >
          DMS Dashboard
        </Link>
      ),
    },
    {
      key: "7",
      label: (
        <Link
          className="text-black no-underline hover:text-green"
          to="/SLA-dashboard"
        >
          SLA Dashboard
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

const schedule_items = (lang, dict, navigate) => {
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

const setting_item = (dict, lang, navigate) => {
  const list = [
    {
      key: "1",
      label: (
        <Link className="text-black no-underline hover:text-green" to="/">
          Profile
        </Link>
      ),
    },
  ];

  localStorage.getItem("sessionToken")
    ? list.push({
        key: "3",
        label: (
          <div
            className="text-black no-underline hover:text-green"
            onClick={() => {
              logoutFetch();
              localStorage.clear();
              navigate("/home");
            }}
          >
            Logout
          </div>
        ),
      })
    : list.push({
        key: "4",
        label: (
          <div
            className="text-black no-underline hover:text-green"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </div>
        ),
      });

  return list;
};

const Navbar = ({ lang, setLang }) => {
  const dict = DICT;

  const loggedIn = localStorage.getItem("sessionToken");
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const [logName, setLogName] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      setLogName(true);
    }
  }, []);

  // const handleLang = () => {
  //   if (lang === "hi") {
  //     setLang("en");
  //   } else {
  //     setLang("hi");
  //   }
  // };

  const location = useLocation();
  const [title, setTitle] = useState("");

  // useEffect(() => {
  //   const titleName = location.pathname.split("/").join("").split("-")[0];
  //   if (titleName === "dashboard") {
  //     setTitle("Sanitation");
  //   } else if (titleName === "home") {
  //     setTitle("");
  //   } else {
  //     setTitle(titleName);
  //   }
  // }, [location]);

  return (
    <div className="mx-3 font-nutino bg-white p-1 shadow-md">
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-2 items-center">
          <img src={img1} className="h-10" alt="" />
          <div
            className="z-50  flex items-center h-12 m-auto  justify-start font-bold text-lg"
            style={{ color: "#FF9500" }}
          >
            <span className="capitalize mr-1">{title} </span> Monitoring System
          </div>
        </div>

        <div className="flex">
          <div className="z-50  flex items-center h-12 justify-center ">
            <div className="hidden mt-0 xl:flex gap-1 justify-start items-center z-50 text-base font-semibold h-fit text-black lg:text-base">
              {!loggedIn && (
                <Link to={"/home"} className="no-underline text-black text-sm">
                  <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded">
                    {dict.home[lang]}
                  </div>
                </Link>
              )}

              {/* <Link className="text-black no-underline " to="/dashboard">
            <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded">
              Dashboard{" "}
            </div>
          </Link> */}

              {loggedIn && (
                <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded ">
                  <DropDown
                    text="black"
                    items={dashboards(lang, dict)}
                    name={"Dashboard"}
                  ></DropDown>
                </div>
              )}
              <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded">
                <DropDown
                  text="black"
                  items={register_items(lang, dict)}
                  name={dict.register[lang]}
                ></DropDown>
              </div>

              <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded">
                <DropDown
                  text="black"
                  items={assignment_items(lang, dict)}
                  name="Assignment"
                ></DropDown>
              </div>

              <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded">
                <DropDown
                  text="black"
                  items={schedule_items(lang, dict, navigate)}
                  name="Schedule"
                ></DropDown>
              </div>

              <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded">
                <DropDown
                  text="black"
                  items={complaince_items(lang, dict)}
                  name="Complaince"
                ></DropDown>
              </div>

              <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded">
                <DropDown
                  text="black"
                  items={reports_items(lang, dict)}
                  name="Reports"
                ></DropDown>
              </div>

              {/* <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded">
            <DropDown
            text="black"
              items={waste_items(lang, dict)}
              name="Waste Management"
            ></DropDown>
          </div> */}

              <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded">
                <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded">
                  <DropDown
                    text="black"
                    items={setting_item(dict, lang, navigate)}
                    name={dict.setting[lang]}
                  ></DropDown>
                </div>
              </div>

              {/* {!logName ? (
            <button onClick={() => handleNavigation("/login")}>
              <div className="h-9 flex  items-center hover:bg-lime-300 px-2">
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
                <div className="h-9 flex  items-center hover:bg-lime-300 px-2">
                  Logout
                </div>
              </button>
            </div>
          )} */}
            </div>

            <div className="flex w-11/12 m-auto justify-between xl:hidden">
              <span className="flex items-center">
                <Button
                  className="flex xl:hidden bg-transparent border-none text-black"
                  onClick={showDrawer}
                >
                  <MenuOutlined></MenuOutlined>
                </Button>
              </span>
            </div>

            <Drawer
              onClose={onClose}
              open={open}
              title={
                <div className="text-violet-950 text-lg font-semibold">
                  Tentage and Sanitation Monitoring System
                </div>
              }
            >
              <div className="text-base">
                {loggedIn && (
                  <div className="h-10 text-black font-semibold border-b flex items-center hover:bg-orange-300  hover:text-black px-3 ">
                    <DropDown
                      text="black"
                      items={dashboards(lang, dict)}
                      name={"Dashboard"}
                    ></DropDown>
                  </div>
                )}

                {!loggedIn && (
                  <Link to={"/home"} className="no-underline text-black">
                    <div className="h-10 text-black font- border-b flex items-center hover:bg-orange-300  hover:text-black px-3 ">
                      {dict.home[lang]}
                    </div>
                  </Link>
                )}
                <div className="h-10 text-black font-semibold border-b flex items-center hover:bg-orange-300  hover:text-black px-3 ">
                  <DropDown
                    text="black"
                    items={register_items(lang, dict)}
                    name={dict.register[lang]}
                  ></DropDown>
                </div>

                <div className="h-10 text-black font-semibold border-b flex items-center hover:bg-orange-300  hover:text-black px-3 ">
                  <DropDown
                    text="black"
                    items={assignment_items(lang, dict)}
                    name="Assignment"
                  ></DropDown>
                </div>

                <div className="h-10 text-black font-semibold border-b flex items-center hover:bg-orange-300  hover:text-black px-3 ">
                  <DropDown
                    text="black"
                    items={schedule_items(lang, dict, navigate)}
                    name="Schedule"
                  ></DropDown>
                </div>

                <div className="h-10 text-black font-semibold border-b flex items-center hover:bg-orange-300  hover:text-black px-3 ">
                  <DropDown
                    text="black"
                    items={complaince_items(lang, dict)}
                    name="Complaince"
                  ></DropDown>
                </div>

                <div className="h-10 text-black font-semibold border-b flex items-center hover:bg-orange-300  hover:text-black px-3 ">
                  <DropDown
                    text="black"
                    items={reports_items(lang, dict)}
                    name="Reports"
                  ></DropDown>
                </div>

                <div className="h-10 text-black font-semibold border-b flex items-center hover:bg-orange-300  hover:text-black px-3 ">
                  <DropDown
                    text="black"
                    items={setting_item(dict, lang, navigate)}
                    name={dict.setting[lang]}
                  ></DropDown>
                </div>

                {/* <div className="h-9 flex  items-center hover:bg-lime-300 px-2 rounded">
            <DropDown
            text="black"
              items={waste_items(lang, dict)}
              name="Waste Management"
            ></DropDown>
          </div> */}

                {/* <div className="h-10  text-black font-semibold border-b flex items-center hover:bg-lime-300 px-3 bg-04">
              \{" "}
              <DropDown
              text="black"
                items={setting_item(dict, lang)}
                name={dict.setting[lang]}
              ></DropDown>
            </div> */}
                {/* 
            <div className="h-10  text-black font-semibold border-b flex items-center hover:bg-lime-300 px-3 bg-04">
              {dict.help[lang]}
            </div> */}

                {/* 
            <button
              onClick={handleLang}
              className="h-10 w-full  text-black font-semibold border-b flex items-center hover:bg-lime-300 px-3 bg-04"
            >
              A / अ{" "}
            </button> */}

                {/* {!logName ? (
              <button onClick={() => handleNavigation("/login")}>
                <div className="h-9 flex items-center hover:bg-lime-300 px-2 text-black font-semibold  ">
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
                  <div className="h-9 flex text-black font-semibold  items-center hover:b2-lime-300 px-3">
                    {dict.logout[lang]}
                  </div>
                </button>
              </div>
            )} */}
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
