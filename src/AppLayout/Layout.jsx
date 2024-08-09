import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { Outlet, useLocation } from "react-router";
import MainNavbar from "../navbar/MainNavbar";
import CopyWrite from "../footer/Copywrite";
import { DICT } from "../urils/dictionary";

const Layout = () => {
  const localLang = localStorage.getItem("lang");

  const [lang, setLang] = useState(localLang || "en");

  useEffect(() => {
    if (lang) {
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  const props = { dict: DICT, lang: lang };
  const [pageWidthFull, setPageWidthFull] = useState(false);
  const [classWidth, setClassWidth] = useState();

  useEffect(() => {
    if (pageWidthFull) {
      setClassWidth(
        "md:w-10/12 w-11/12 xs:w-9/12 xl:w-10/12 2xl:w-9/12 flex flex-col m-auto"
      );
    } else {
      setClassWidth("w-full flex flex-col m-auto");
    }
  }, [pageWidthFull]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-roboto">
      <div>
        <MainNavbar {...props} setLang={setLang}></MainNavbar>
        <div className={`${classWidth}`}>
          <Outlet context={[props.dict, props.lang, setPageWidthFull]}></Outlet>
        </div>
      </div>
      <div className="h-10"></div>
      <div className=" w-full mt-auto px-3">
        <div className="bg-13 p-3">
          <div className="md:w-10/12 w-9/12 xl:w-10/12 2xl:w-9/12  flex flex-col m-auto">
            <Footer {...props}></Footer>
          </div>
        </div>
        <div>
          <CopyWrite {...props}></CopyWrite>
        </div>
      </div>
    </div>
  );
};

export default Layout;
