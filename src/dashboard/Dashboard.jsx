import React, { useEffect, useState } from "react";
import StackedColumnChart from "../Charts/StackedColumnChart";
import DistributedColumnChart from "../Charts/DistributedColumnChart";
import MapData from "../dashboardNew/MapData.jsx";
import { useOutletContext } from "react-router";
import GroupCheckBox from "../commonComponents/GroupCheckBox";
import ListMaker from "./ListMaker";
import ResourceUtilizationCharts from "../Charts/ResourceUtilizationCharts";
import UserFeedBackChart from "../Charts/UserFeedBackChart";
import SectorSelection from "./SectorSelection";
import StackedColumn from "./StackedColumn";

import toilet from "../assets/MonitoringImages/Dashboard/toilet.png";
import tentage from "../assets/MonitoringImages/Dashboard/tentage.png";
import location from "../assets/MonitoringImages/Dashboard/location.png";
import wsVhe from "../assets/MonitoringImages/Dashboard/wsVhe.png";
import waste from "../assets/MonitoringImages/Dashboard/waste.png";
import Centers from "./Centers.jsx";
import Assets from "./Assects.jsx";

const tasksNotCompletedMessageList = [
  "Ensure proper disposal of sanitary waste.",
  "Check and restock sanitary supplies ",
  "Check for any damage to the tenting.",
  "Inspect all tented areas for cleanliness.",
  "Monitor waste for proper usage and overflow.",
  "Ensure waste is sorted correctly.",
  "Monitor bins for proper usage.",
  "Remove all waste from bins.",
];

const finalCalculator = (sectorStats) => {
  let finalObj = { total: 0, ok: 0, average: 0, bad: 0 };

  for (const key of sectorStats) {
    finalObj.total = finalObj.total + key.total;
    finalObj.ok = finalObj.ok + key.ok;
    finalObj.average = finalObj.average + key.average;
    finalObj.bad = finalObj.bad + key.bad;
  }
  return finalObj;
};

const stackedCalc = (checkedValues, setShowDashboardFor, selectedSector) => {
  const details = [];
  const values = [];

  // Tents
  const sector1Tents = {
    total: 15937,
    ok: Math.round(0.75 * 15937),
    average: Math.round(0.15 * 15937),
    bad: Math.round(0.2 * 15937),
  };

  const sector2Tents = {
    total: 15937,
    ok: Math.round(0.8 * 15937),
    average: Math.round(0.1 * 15937),
    bad: Math.round(0.1 * 15937),
  };

  const sector3Tents = {
    total: 15937,
    ok: Math.round(0.7 * 15937),
    average: Math.round(0.15 * 15937),
    bad: Math.round(0.15 * 15937),
  };

  // Sanitation
  const sector1San = {
    total: 96000 / 3,
    ok: Math.round(0.54 * (96000 / 3)),
    average: Math.round(0.26 * (96000 / 3)),
    bad: Math.round(0.2 * (96000 / 3)),
  };

  const sector2San = {
    total: 96000 / 3,
    ok: Math.round(0.6 * (96000 / 3)),
    average: Math.round(0.25 * (96000 / 3)),
    bad: Math.round(0.15 * (96000 / 3)),
  };

  const sector3San = {
    total: 96000 / 3,
    ok: Math.round(0.5 * (96000 / 3)),
    average: Math.round(0.25 * (96000 / 3)),
    bad: Math.round(0.25 * (96000 / 3)),
  };

  // Wastes
  const sector1Wastes = {
    total: 160 / 3,
    ok: Math.round(0.6 * (160 / 3)),
    average: Math.round(0.2 * (160 / 3)),
    bad: Math.round(0.2 * (160 / 3)),
  };

  const sector2Wastes = {
    total: 160 / 3,
    ok: Math.round(0.7 * (160 / 3)),
    average: Math.round(0.2 * (160 / 3)),
    bad: Math.round(0.1 * (160 / 3)),
  };

  const sector3Wastes = {
    total: 160 / 3,
    ok: Math.round(0.5 * (160 / 3)),
    average: Math.round(0.2 * (160 / 3)),
    bad: Math.round(0.3 * (160 / 3)),
  };

  // Bins
  const sector1Bins = {
    total: 60000 / 3,
    ok: Math.round(0.6 * (60000 / 3)),
    average: Math.round(0.2 * (60000 / 3)),
    bad: Math.round(0.2 * (60000 / 3)),
  };

  const sector2Bins = {
    total: 60000 / 3,
    ok: Math.round(0.7 * (60000 / 3)),
    average: Math.round(0.2 * (60000 / 3)),
    bad: Math.round(0.1 * (60000 / 3)),
  };

  const sector3Bins = {
    total: 60000 / 3,
    ok: Math.round(0.5 * (60000 / 3)),
    average: Math.round(0.2 * (60000 / 3)),
    bad: Math.round(0.3 * (60000 / 3)),
  };

  if (checkedValues.includes("Tentage") || !checkedValues.length) {
    let selectedTents = [];

    if (selectedSector.includes("Sector 1")) {
      selectedTents.push(sector1Tents);
    }

    if (selectedSector.includes("Sector 2")) {
      selectedTents.push(sector2Tents);
    }

    if (selectedSector.includes("Sector 3")) {
      selectedTents.push(sector3Tents);
    }

    const finalStats = finalCalculator(selectedTents);

    details.push({
      title: "Tentage",
      value: {
        label: "Tentage",
        total: finalStats.total,
        ok: finalStats.ok,
        average: finalStats.average,
        bad: finalStats.bad,
      },
    });

    values.push("Tentage");
  }

  if (checkedValues.includes("Sanitization") || !checkedValues.length) {
    let selectedSans = [];

    if (selectedSector.includes("Sector 1")) {
      selectedSans.push(sector1San);
    }

    if (selectedSector.includes("Sector 2")) {
      selectedSans.push(sector2San);
    }

    if (selectedSector.includes("Sector 3")) {
      selectedSans.push(sector3San);
    }

    const finalStats = finalCalculator(selectedSans);
    details.push({
      title: "Sanitization",
      value: {
        label: "Sanitization",
        total: finalStats.total,
        ok: finalStats.ok,
        average: finalStats.average,
        bad: finalStats.bad,
      },
    });
    values.push("Sanitization");
  }

  if (checkedValues.includes("Wastes") || !checkedValues.length) {
    let selectedWastes = [];

    if (selectedSector.includes("Sector 1")) {
      selectedWastes.push(sector1Wastes);
    }

    if (selectedSector.includes("Sector 2")) {
      selectedWastes.push(sector2Wastes);
    }

    if (selectedSector.includes("Sector 3")) {
      selectedWastes.push(sector3Wastes);
    }

    const finalStats = finalCalculator(selectedWastes);
    details.push({
      title: "Wastes",
      value: {
        label: "Wastes",
        total: finalStats.total,
        ok: finalStats.ok,
        average: finalStats.average,
        bad: finalStats.bad,
      },
    });
    values.push("Wastes");
  }

  if (checkedValues.includes("Bins") || !checkedValues.length) {
    let selectedWastes = [];

    if (selectedSector.includes("Sector 1")) {
      selectedWastes.push(sector1Bins);
    }

    if (selectedSector.includes("Sector 2")) {
      selectedWastes.push(sector2Bins);
    }

    if (selectedSector.includes("Sector 3")) {
      selectedWastes.push(sector3Bins);
    }

    const finalStats = finalCalculator(selectedWastes);
    details.push({
      title: "Bins",
      value: {
        label: "Bins",
        total: finalStats.total,
        ok: finalStats.ok,
        average: finalStats.average,
        bad: finalStats.bad,
      },
    });
    values.push("Bins");
  }

  setShowDashboardFor(() => {
    return {
      dashboards: details.length,
      names: details,
      values,
    };
  });
};

const Dashboard = () => {
  const contextProps = useOutletContext();
  const setPageWidthFull = contextProps[2];

  const [selectedDashboardVals, setSelectedDashboardVals] = useState([
    "Tentage",
    "Sanitization",
    "Wastes",
    "Bins",
  ]);

  const [showDashboardFor, setShowDashboardFor] = useState({
    dashboards: 3,
    names: [
      {
        title: "Tentage",
        value: {
          label: "Tentage",
          total: 47812,
          ok: 500,
          average: 300,
          bad: 200,
        },
      },
      {
        title: "Sanitization",
        value: {
          label: "Sanitization",
          total: 56000,
          ok: 400,
          average: 300,
          bad: 200,
        },
      },
      {
        title: "Wastes",
        value: {
          label: "Wastes",
          total: 47000,
          ok: 300,
          average: 300,
          bad: 200,
        },
      },
      {
        title: "Bins",
        value: {
          label: "Bins",
          total: 70000,
          ok: 300,
          average: 300,
          bad: 200,
        },
      },
    ],
    values: ["Tentage", "Wastes", "Sanitization", "Bins"],
  });

  const [selectedSector, setSelectedSector] = useState([
    "Sector 1",
    "Sector 2",
    "Sector 3",
  ]);

  useEffect(() => {
    stackedCalc(selectedDashboardVals, setShowDashboardFor, selectedSector);
  }, [selectedDashboardVals, selectedSector]);

  useEffect(() => {
    setPageWidthFull(false);
  }, []);

  return (
    <div className="flex flex-col gap-2 px-3">
      <div className="mt-2 bg-gray-200 p-1 flex w-full">
        <div className="">
          <div className="text-sm font-semibold ">Dashboard:</div>
          <GroupCheckBox
            setSelectedDashboardVals={setSelectedDashboardVals}
          ></GroupCheckBox>
        </div>

        <div className="mt-1 border-l border-gray-500 border-dashed pl-3 h-full">
          <div className="text-sm font-semibold">Sectors:</div>
          <SectorSelection setSectors={setSelectedSector}></SectorSelection>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full relative">
        <div className="border bg-gray-200 sm:col-span-2 lg:col-span-1">
          <div className="flex gap-3 items-center justify-center">
            <div className="flex text-sm items-center justify-center">
              <span>Good: </span>
              <div className="h-3 w-3 ml-1 bg-green-500"></div>
            </div>
            <div className="flex text-sm items-center justify-center">
              <span>Average: </span>
              <div className="h-3 w-3 ml-1 bg-yellow-500"></div>
            </div>
            <div className="flex text-sm items-center justify-center">
              <span>Bad: </span>
              <div className="h-3 w-3 ml-1 bg-green-500"></div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <StackedColumnChart
              showDashboardFor={showDashboardFor}
            ></StackedColumnChart>
          </div>
        </div>

        <div className="border w-full ">
          <DistributedColumnChart
            selectedSector={selectedSector}
            tentage={showDashboardFor.values.includes("Tentage")}
            sanitization={showDashboardFor.values.includes("Sanitization")}
            wastes={showDashboardFor.values.includes("Wastes")}
            bins={showDashboardFor.values.includes("Bins")}
          ></DistributedColumnChart>
        </div>

        <div className="border w-full ">
          <ResourceUtilizationCharts
            selectedSectors={selectedSector}
            totalCats={showDashboardFor.dashboards}
            tentage={showDashboardFor.values.includes("Tentage")}
            sanitization={showDashboardFor.values.includes("Sanitization")}
            wastes={showDashboardFor.values.includes("Wastes")}
            bins={showDashboardFor.values.includes("Bins")}
          ></ResourceUtilizationCharts>
        </div>

        <div className="h-full border border-gray-400">
          <ListMaker
            label={"Daily Tasks"}
            selectedSectors={selectedSector}
            messageList={tasksNotCompletedMessageList}
            tentage={showDashboardFor.values.includes("Tentage")}
            sanitization={showDashboardFor.values.includes("Sanitization")}
            wastes={showDashboardFor.values.includes("Wastes")}
          ></ListMaker>
        </div>

        <div className=" md:col-span-2  ">
          <div className="flex  text-sm gap-3 bg-pink-100 items-center justify-center p-1">
            <div className="flex gap-1">
              <div className="h-full flex items-center">Tent:</div>
              <img className="h-5 w-5" src={tentage} alt="" />
            </div>{" "}
            <div className="flex gap-1">
              <span className="h-full flex items-center">Vehicle:</span>
              <img className="h-5 w-5" src={wsVhe} alt="" />
            </div>{" "}
            <div className="flex gap-1">
              <span className="h-full flex items-center">Sanitation:</span>
              <img className="h-5 w-5" src={toilet} alt="" />
            </div>{" "}
            <div className="flex gap-1">
              <span className="h-full flex items-center">Bins:</span>
              <img className="h-5 w-5" src={waste} alt="" />
            </div>
          </div>
          <div>
            <MapData
              tentage={
                showDashboardFor.values.includes("Tentage") ||
                !showDashboardFor.values.length
              }
              sanitization={
                showDashboardFor.values.includes("Sanitization") ||
                !showDashboardFor.values.length
              }
              wastes={
                showDashboardFor.values.includes("Wastes") ||
                !showDashboardFor.values.length
              }
              bin={
                showDashboardFor.values.includes("Bins") ||
                !showDashboardFor.values.length
              }
            ></MapData>
          </div>
        </div>

        <div className="h-full border-gray-400 border">
          <ListMaker
            isAlert={true}
            label={"Alerts And Notifications"}
            selectedSectors={selectedSector}
            messageList={tasksNotCompletedMessageList}
            tentage={showDashboardFor.values.includes("Tentage")}
            sanitization={showDashboardFor.values.includes("Sanitization")}
            wastes={showDashboardFor.values.includes("Wastes")}
            bins={showDashboardFor.values.includes("Bins")}
          ></ListMaker>
        </div>

        <div className="border w-full">
          <StackedColumn
            totalCats={showDashboardFor.dashboards}
            selectedSectors={selectedSector}
            tentage={showDashboardFor.values.includes("Tentage")}
            sanitization={showDashboardFor.values.includes("Sanitization")}
            wastes={showDashboardFor.values.includes("Wastes")}
            bins={showDashboardFor.values.includes("Bins")}
          ></StackedColumn>
        </div>

        <div className="border w-full">
          <Assets
            selectedSectors={selectedSector}
            tentage={showDashboardFor.values.includes("Tentage")}
            sanitization={showDashboardFor.values.includes("Sanitization")}
            wastes={showDashboardFor.values.includes("Wastes")}
          ></Assets>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
