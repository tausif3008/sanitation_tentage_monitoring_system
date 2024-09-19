import React from "react";
import LineChartWithArea from "../dashboardNew/LineChartWithArea";
import TypeList from "../dashboardNew/TypeList";
import TotalDocuments from "./TotalDocuments";
import DocumentDetails from "./DocumetDetails";
import DocumentStatus from "./DocumentStatus";
import Document from "./Documents/Document";
import SavedDocuments from "./SavedDocuments";
import RecentActivities from "./RecentActivities";

const DMSDashboard = () => {
  return (
    <div className="grid grid-cols-4 mx-3 mt-3 gap-3 ">
      <div className="col-span-4 grid grid-cols-6 gap-2">
        <div className="col-span-6 md:col-span-3 border shadow-md bg-white rounded-md">
          <TotalDocuments></TotalDocuments>
        </div>
        <div className="w-full border md:col-span-3 col-span-6 shadow-md bg-white rounded-md">
          <DocumentDetails></DocumentDetails>
        </div>
      </div>
      <div className="col-span-4 bg-white shadow-md rounded">
        <Document></Document>
      </div>
      <div className="col-span-4 grid grid-rows-2 gap-1 flex-col">
        <div className="h-[250px] overflow-y-scroll">
          <SavedDocuments></SavedDocuments>
        </div>
        <div className="h-[265px] overflow-y-scroll">
          <RecentActivities></RecentActivities>
        </div>
      </div>
    </div>
  );
};

export default DMSDashboard;
