import React from "react";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./dashboardCalender.css";
import { Button, Checkbox, Col, Row } from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const localizer = momentLocalizer(moment);

const DashboardCalender = () => {
  const [events, setEvents] = useState([
    {
      title: (
        <div className="bg-orange-200 text-orange-500 w-full p-1 rounded-md text-xs">
          Cleaning 1
        </div>
      ),
      start: new Date(),
      end: new Date(),
      allDay: false,
    },
    {
      title: (
        <div className="bg-green-200 text-green-500 w-full p-1 rounded-md text-xs">
          Cleaning 2
        </div>
      ),
      start: new Date("2024-09-10T12:00:00"),
      end: new Date("2024-09-10T13:00:00"),
      allDay: false,
    },
    {
      title: (
        <div className="bg-teal-200 text-teal-500 w-full p-1 rounded-md text-xs">
          Cleaning 3
        </div>
      ),
      start: new Date("2024-09-11T12:00:00"),
      end: new Date("2024-09-11T13:00:00"),
      allDay: false,
    },
    {
      title: (
        <div className="bg-blue-200 text-blue-500 w-full p-1 rounded-md text-xs">
          Cleaning 4
        </div>
      ),
      start: new Date("2024-09-11T12:00:00"),
      end: new Date("2024-09-11T13:00:00"),
      allDay: false,
    },
  ]);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: "transparent", // Remove background color
        border: "none",
        color: "black",
        padding: "none",
      },
    };
  };

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  return (
    <div className="flex">
      <div>
        <div>
          <div className="mb-3 px-2">
            <Button className="bg-blue-700 text-white w-56  p-0">
              <div className="hover:background-orange-500 hover:text-blue-600 w-full">
                <PlusOutlined></PlusOutlined> Add Task{" "}
              </div>
            </Button>
          </div>

          <div>Filter</div>
          <Checkbox.Group
            style={{
              width: "100%",
            }}
            onChange={onChange}
            className="flex flex-col"
          >
            <div id="all">
              <Checkbox value="all">View All</Checkbox>
            </div>
            <div id="omega">
              <Checkbox value="omega">Team Omega</Checkbox>
            </div>
            <div id="sigma">
              <Checkbox value="sigma">Team Sigma</Checkbox>
            </div>
            <div id="delta">
              <Checkbox value="delta">Team Delta</Checkbox>
            </div>
            <div id="phoenix">
              <Checkbox value="phoenix">Team Phoenix</Checkbox>
            </div>
            <div id="titan">
              <Checkbox value="titan">Team Titan</Checkbox>
            </div>
          </Checkbox.Group>
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: "100%" }}
        eventPropGetter={eventStyleGetter} // Apply custom styles to events
      />
    </div>
  );
};

export default DashboardCalender;
