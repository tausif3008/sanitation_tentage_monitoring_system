// src/SavedDocuments.js
import React from "react";
import { PaperClipOutlined } from "@ant-design/icons"; // Importing the paper clip icon from Ant Design

const SavedDocuments = () => {
  const documents = [
    { id: 1, name: "Document Name 1" },
    { id: 2, name: "Document Name 2" },
    { id: 3, name: "Document Name 3" }, // Example of a deleted document
    { id: 4, name: "Document Name 4" },
    { id: 4, name: "Document Name 5" },
    { id: 4, name: "Document Name 6" },
    { id: 4, name: "Document Name 7" },
    { id: 4, name: "Document Name 8" },
    { id: 4, name: "Document Name 8" },
    { id: 4, name: "Document Name 9" },
    { id: 4, name: "Document Name 9" },
    { id: 4, name: "Document Name 10" },
    { id: 4, name: "Document Name 11" },
    { id: 4, name: "Document Name 12" },
    { id: 4, name: "Document Name 13" },
  ];

  return (
    <div className=" bg-white rounded-lg shadow-md p-3 overflow-y-scroll h-[550px] w-full">
      <h3 className="text-lg font-bold">Saved Documents</h3>
      <hr className="border-dashed mt-0" />

      <div>
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span
              className={`${doc.isDeleted ? "line-through text-red-500" : ""}`}
            >
              {doc.name}
            </span>
            <PaperClipOutlined className="text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedDocuments;
