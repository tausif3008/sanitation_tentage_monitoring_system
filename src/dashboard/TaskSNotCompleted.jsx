import { Divider } from "antd";
import React from "react";

const TaskSNotCompleted = ({ label, list }) => {
  return (
    <div className="w-full h-full border-gray-400 border">
      <div className="text-xl font-semibold text-center mt-1">
        {label}
        <div className="w-11/12 m-auto">
          <Divider className=" m-1 w-10/12 bg-orange-700"></Divider>
        </div>
      </div>

      <div className="mt-3 h-56 overflow-y-scroll">
        <ul className="list-disc">
          {list.map((el) => {
            return <li key={el}>{el}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default TaskSNotCompleted;
