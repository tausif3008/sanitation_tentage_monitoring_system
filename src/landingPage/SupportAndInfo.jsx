import React from "react";
import { Divider } from "antd";
import Chart from "./Chart";
import { useOutletContext } from "react-router";

const SupportAndInfo = () => {
  const [dict, lang] = useOutletContext();
  return (
    <div className="mt-3">
      <div className=" text-green-700 font-semibold text-2xl ">
        {dict.support_info[lang]}
      </div>
      <Divider className="bg-green-500 mt-0" />

      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 text-sm">
        <div className="border-1 border-cc h-60 ">
          <div className="bg-ec h-12 flex items-center justify-center uppercase font-semibold text-white text-lg">
            {dict.city_corner[lang]}
          </div>
          <div className="p-2">
            <ul className="list-disc font-semibold">
              <span className="hover:text-ec ">
                <li> {dict.info_missing[lang]}</li>
              </span>
            </ul>
          </div>
        </div>
        <div className="border-1 border-cc h-60 ">
          <div className="bg-5e  h-12 flex items-center justify-center uppercase font-semibold text-white text-lg">
            {dict.useful_links[lang]}
          </div>
          <div className="p-2">
            <ul className="list-disc  font-semibold ">
              <li className="">
                <span className="hover:text-ec">
                  {dict.photo_missing_found[lang]}
                </span>
              </li>
              <li>
                <span className="hover:text-ec">
                  {dict.check_status[lang]}{" "}
                </span>
              </li>
              <li>
                <span className="hover:text-ec">{dict.quick_search[lang]}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-1 border-cc h-60">
          <div className="bg-ec9 h-12 flex items-center justify-center uppercase font-semibold text-white text-lg">
            {dict.login_section[lang]}
          </div>
          <div className="p-2">
            <ul className="list-disc font-semibold">
              <span className="hover:text-ec">
                <li>{dict.police[lang]}</li>{" "}
              </span>
              <span className="hover:text-ec">
                <li>{dict.mela_official[lang]}</li>
              </span>
              <span className="hover:text-ec">
                <li>{dict.lost_found_center[lang]}</li>
              </span>{" "}
              <span className="hover:text-ec">
                <li>{dict.citizens[lang]}</li>
              </span>
            </ul>
          </div>
        </div>
        <div className="border-1 border-cc h-60">
          <div className="bg-249B  h-12 flex items-center justify-center uppercase font-semibold text-white text-lg">
            {dict.todays_statistics[lang]}{" "}
          </div>
          <div className="flex items-center justify-center p-2">
            <Chart></Chart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportAndInfo;
