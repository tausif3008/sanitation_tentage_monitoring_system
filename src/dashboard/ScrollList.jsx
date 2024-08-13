import { Divider, Tooltip } from "antd";
import React from "react";

const ScrollList = ({ label, list }) => {
  return (
    <div className="w-full">
      <div className="text-xl font-semibold text-center mt-1">
        {label}
        <div className="w-11/12 m-auto">
          <Divider className=" m-1 w-10/12 bg-orange-700"></Divider>
        </div>
      </div>

      <div className="overflow-y-scroll ">
        <div className="m-2">
          <div className="flex justify-between h-10 font-semibold border-green-400 items-center ">
            <div className="h-full flex pl-2 items-center border border-green-400 w-full">
              Sections{" "}
            </div>
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              Shift 1{" "}
            </div>
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              Shift 2{" "}
            </div>{" "}
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              Shift 3{" "}
            </div>{" "}
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              Shift 4{" "}
            </div>
          </div>{" "}
          <div className="flex justify-between h-10 border-green-400 items-center ">
            <div className="h-full flex pl-2 items-center border border-green-400 w-full">
              Sanitation
            </div>
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-green-500`}></div>
            </div>
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-red-500`}></div>
            </div>{" "}
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-red-500`}></div>
            </div>{" "}
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-green-500`}></div>
            </div>
          </div>{" "}
          <div className="flex justify-between h-10 border-green-400 items-center ">
            <div className="h-full flex pl-2 items-center border border-green-400 w-full">
              Wastes
            </div>
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-green-500`}></div>
            </div>
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-green-500`}></div>
            </div>{" "}
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-red-500`}></div>
            </div>{" "}
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-green-500`}></div>
            </div>
          </div>
          <div className="flex justify-between h-10 border-green-400 items-center ">
            <div className="h-full flex pl-2 items-center border border-green-400 w-full">
              Tentation
            </div>
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-green-500`}></div>
            </div>
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-red-500`}></div>
            </div>{" "}
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-green-500`}></div>
            </div>{" "}
            <div
              className={`border h-full w-32 text-sm flex items-center justify-center`}
            >
              <div className={`h-4 w-4 rounded-full bg-green-500`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollList;
// const ScrollList = ({ label, list }) => {
//   return (
//     <div className="w-full h-full border-gray-400 border">
//       <div className="text-xl font-semibold text-center mt-1">
//         {label}
//         <div className="w-11/12 m-auto">
//           <Divider className=" m-1 w-10/12 bg-orange-700"></Divider>
//         </div>
//       </div>

//       <div className="mt-3 h-full overflow-y-scroll">
//         <ul className="list-disc">
//           {list.map((el) => {
//             return <li key={el}>{el}</li>;
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ScrollList;
