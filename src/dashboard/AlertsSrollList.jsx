import { Divider } from "antd";
import React, { useEffect, useState } from "react";

const AlertsScrollList = ({ label, list }) => {
  const [alertList, setAlertList] = useState([]);

  useEffect(() => {
    let alerts = [];

    alerts.push(
      "Thank you for attending Kumbh Mela! Please share your feedback on the event at here. Your input is valuable to us."
    );

    alerts.push(
      "Survey Alert: Help us improve future events by participating in a quick survey. Click here."
    );

    const dataList = alerts.map((el) => {
      return (
        <div className="border p-1" key={el}>
          <li>{el}</li>{" "}
        </div>
      );
    });

    setAlertList(() => dataList);
  }, [list]);
  return (
    <div className="w-full h-full">
      <div className="text-xl font-semibold text-center mt-1">
        {label}
        <div className="w-11/12 m-auto">
          <Divider className=" m-1 w-10/12 bg-orange-700"></Divider>
        </div>
      </div>

      <div className="mt-3 h-full overflow-y-scroll px-2">
        <div className="">{alertList}</div>
      </div>
    </div>
  );
};

export default AlertsScrollList;
