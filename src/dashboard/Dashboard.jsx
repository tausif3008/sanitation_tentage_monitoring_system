import React, { useEffect, useState } from "react";
import StackedColumnChart from "../Charts/StackedColumnChart";
import DistributedColumnChart from "../Charts/DistributedColumnChart";
import TaskSNotCompleted from "./TaskSNotCompleted";
import MapData from "./MapData";
import { useOutletContext } from "react-router";
import GroupCheckBox from "../commonComponents/GroupCheckBox";

const tasksNotCompleted = [
  "Toilets Not Cleaned - 10",
  "Toilets Not Repaired - 10",
];

const Dashboard = () => {
  const [dict, lang, setPageWidthFull] = useOutletContext();
  const [showDashboardFor, setShowDashboardFor] = useState({
    dashboards: 3,
    names: [
      {
        title: "Tentage",
        value: {
          label: "Toilets",
          total: 1000,
          ok: "500",
          average: "300",
          bad: "200",
        },
      },
      {
        title: "Sanitization",
        value: {
          label: "Tentage",
          total: 900,
          ok: "400",
          average: "300",
          bad: "200",
        },
      },
      {
        title: "Wastes",
        value: {
          label: "Sanitization",
          total: 8000,
          ok: "300",
          average: "300",
          bad: "200",
        },
      },
    ],
  });

  useEffect(() => {
    setPageWidthFull(false);
  }, []);

  return (
    <div className="flex gap-2 px-3">
      <div className="w-32 mt-3">
        <div className="text-sm font-semibold">Dashboard:</div>
        <GroupCheckBox
          setShowDashboardFor={setShowDashboardFor}
        ></GroupCheckBox>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 justify-between w-full relative">
        <div>
          <StackedColumnChart
            showDashboardFor={showDashboardFor}
          ></StackedColumnChart>
        </div>
        <div className="border">
          <DistributedColumnChart></DistributedColumnChart>
        </div>
        <div>
          <TaskSNotCompleted
            label={"Tasks Not Completed Today"}
            list={tasksNotCompleted}
          ></TaskSNotCompleted>
        </div>
        <div>
          <TaskSNotCompleted
            label={"Alerts And Notifications"}
            list={tasksNotCompleted}
          ></TaskSNotCompleted>
        </div>
        <div className="h-56">
          <MapData></MapData>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
