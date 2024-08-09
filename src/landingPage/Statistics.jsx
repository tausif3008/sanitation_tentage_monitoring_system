import { Divider, Statistic } from "antd";
import React from "react";
import CountUp from "react-countup";
import missing from "../assets/Images/persons/missing persons.png";
import found from "../assets/Images/persons/serach person.png";
import reunion from "../assets/Images/persons/reunion.png";
import pending from "../assets/Images/persons/pending cases.png";
import { useOutletContext } from "react-router";

const Statistics = () => {
  const [dict, lang] = useOutletContext();

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <div className="mt-3">
      <div className="text-green-700 font-semibold text-2xl ">
        {dict.statistics[lang]}
      </div>
      <Divider className="bg-green-500 mt-0" />

      <div className="grid grid-cols-2 sm:grid-cols-2 text-sm xs:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 mb-4 ">
        <div className="flex items-center justify-around   p-2  bg-lime-100 border-r-2  border-b-2 md:border-b-0 border-dashed  border-teal-400">
          <div className="flex w-12 md:w-16">
            <img src={missing} className="w-full" alt="" />
          </div>
          <div className="flex items-center justify-around flex-col font-semibold">
            <span className="flex items-center ">
              <Statistic value={1000} formatter={formatter} />
            </span>
            <span className="flex items-center text-center">
              {dict.total_lost[lang]}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-around  p-2 bg-violet-100 border-b-2 md:border-b-0 md:border-r-2  border-dashed border-teal-400">
          <div className="flex w-12 md:w-16">
            <img src={found} className="w-full" alt="" />
          </div>
          <div className="flex items-center justify-around flex-col font-semibold">
            <span className="flex items-center">
              <Statistic value={900} formatter={formatter} />
            </span>
            <span className="flex items-center text-center font-semibold">
              {dict.total_found[lang]}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-around p-2 bg-green-100 border-r-2 border-teal-400 border-dashed">
          <div className="flex w-12 md:w-14 ml-2">
            <img src={reunion} className="w-full" alt="" />
          </div>

          <div className="flex items-center justify-center flex-col font-semibold">
            <span className="flex items-center">
              <Statistic value={700} formatter={formatter} />
            </span>
            <span className="flex items-center text-center font-semibold">
              {dict.total_reunion[lang]}
            </span>
          </div>
        </div>

        <div className="flex items-center p-2 justify-between bg-zinc-200 font-semibold">
          <div className="flex">
            <img src={pending} className="w-12 sm:w-16 md:w-14" alt="" />
          </div>
          <div className="flex items-center justify-center flex-col">
            <span className="flex items-center ">
              <Statistic value={100} formatter={formatter} />
            </span>
            <span className="flex items-center text-center font-semibold">
              {dict.pending_cases[lang]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
