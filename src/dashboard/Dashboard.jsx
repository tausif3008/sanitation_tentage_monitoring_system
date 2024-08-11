import React, { useEffect, useState } from "react";
import StackedColumnChart from "../Charts/StackedColumnChart";
import DistributedColumnChart from "../Charts/DistributedColumnChart";
import MapData from "./MapData";
import { useOutletContext } from "react-router";
import GroupCheckBox from "../commonComponents/GroupCheckBox";
import ListMaker from "./ListMaker";
import ResourceUtilizationCharts from "../Charts/ResourceUtilizationCharts";
import UserFeedBackChart from "../Charts/UserFeedBackChart";
import SectorSelection from "./SectorSelection";

const tasksNotCompletedMessageList = [
  "Toilets Not Cleaned - 10",
  "Toilets Not Repaired - 10",
  "Tentages Not Cleaned - 10",
  "Tentages Not Repaired - 10",
  "Wastes Not Cleaned - 10",
  "Wastes Not Repaired - 10",
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
  
  const sector1Tents = { total: 300, ok: 200, average: 46, bad: 54 };
  const sector2Tents = { total: 300, ok: 200, average: 50, bad: 50 };
  const sector3Tents = { total: 400, ok: 250, average: 96, bad: 54 };

  const sector1San = { total: 200, ok: 100, average: 46, bad: 54 };
  const sector2San = { total: 600, ok: 450, average: 46, bad: 54 };
  const sector3San = { total: 100, ok: 56, average: 24, bad: 20 };

  const sector1Wastes = { total: 400, ok: 300, average: 64, bad: 36 };
  const sector2Wastes = { total: 500, ok: 450, average: 20, bad: 30 };
  const sector3Wastes = { total: 300, ok: 200, average: 24, bad: 76 };

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
  ]);

  const [showDashboardFor, setShowDashboardFor] = useState({
    dashboards: 3,
    names: [
      {
        title: "Tentage",
        value: {
          label: "Tentage",
          total: 1000,
          ok: "500",
          average: "300",
          bad: "200",
        },
      },
      {
        title: "Sanitization",
        value: {
          label: "Sanitization",
          total: 900,
          ok: "400",
          average: "300",
          bad: "200",
        },
      },
      {
        title: "Wastes",
        value: {
          label: "Wastes",
          total: 8000,
          ok: "300",
          average: "300",
          bad: "200",
        },
      },
    ],
    values: ["Tentage", "Wastes", "Sanitization"],
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
    <div className="flex flex-col lg:flex-row gap-2 px-3">
      <div className="w-full lg:w-32 mt-3 bg-gray-200 p-1 flex lg:flex-col">
        <div className="">
          <div className="text-sm font-semibold ">Dashboard:</div>
          <GroupCheckBox
            setSelectedDashboardVals={setSelectedDashboardVals}
          ></GroupCheckBox>
        </div>

        <div className="md:mt-3 mt-0 lg:pt-3 border-l border-gray-500 border-dashed pl-3 lg:pl-0 lg:border-none h-full">
          <div className="text-sm font-semibold">Sectors:</div>
          <SectorSelection setSectors={setSelectedSector}></SectorSelection>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-between w-full relative">
        <div>
          <StackedColumnChart
            showDashboardFor={showDashboardFor}
          ></StackedColumnChart>
        </div>
        <div className="border w-full">
          <DistributedColumnChart
            selectedSector={selectedSector}
            tentage={showDashboardFor.values.includes("Tentage")}
            sanitization={showDashboardFor.values.includes("Sanitization")}
            wastes={showDashboardFor.values.includes("Wastes")}
          ></DistributedColumnChart>
        </div>

        <div className="border w-full">
          <ResourceUtilizationCharts
            selectedSectors={selectedSector}
            totalCats={showDashboardFor.dashboards}
            tentage={showDashboardFor.values.includes("Tentage")}
            sanitization={showDashboardFor.values.includes("Sanitization")}
            wastes={showDashboardFor.values.includes("Wastes")}
          ></ResourceUtilizationCharts>
        </div>

        <div>
          <ListMaker
            label={"Tasks Not Completed Today"}
            selectedSectors={selectedSector}
            messageList={tasksNotCompletedMessageList}
            tentage={showDashboardFor.values.includes("Tentage")}
            sanitization={showDashboardFor.values.includes("Sanitization")}
            wastes={showDashboardFor.values.includes("Wastes")}
          ></ListMaker>
        </div>

        <div>
          <ListMaker
            label={"Alerts And Notifications"}
            selectedSectors={selectedSector}
            messageList={tasksNotCompletedMessageList}
            tentage={showDashboardFor.values.includes("Tentage")}
            sanitization={showDashboardFor.values.includes("Sanitization")}
            wastes={showDashboardFor.values.includes("Wastes")}
          ></ListMaker>
        </div>

        <div className="h-56">
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
          ></MapData>
        </div>

        <div>
          <div className="border w-full mt-12 sm:mt-0">
            <UserFeedBackChart
              totalCats={showDashboardFor.dashboards}
              selectedSectors={selectedSector}
              tentage={showDashboardFor.values.includes("Tentage")}
              sanitization={showDashboardFor.values.includes("Sanitization")}
              wastes={showDashboardFor.values.includes("Wastes")}
            ></UserFeedBackChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
