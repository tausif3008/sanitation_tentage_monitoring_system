import React, { useState, useEffect } from "react";
import ScrollList from "./ScrollList";
import AlertsScrollList from "./AlertsSrollList";

const getTasksBySectsCats = (
  cats,
  sanitization,
  tentage,
  wastes,
  bins,
  selectedSectors
) => {
  let finalTasks = [];

  for (const el of cats) {
    if (
      tentage &&
      el.cat === "tentage" &&
      selectedSectors.includes(el.info.sector)
    ) {
      finalTasks = [...finalTasks, ...el.info.tasks];
    }

    if (
      sanitization &&
      el.cat === "sanitization" &&
      selectedSectors.includes(el.info.sector)
    ) {
      finalTasks = [...finalTasks, ...el.info.tasks];
    }

    if (
      wastes &&
      el.cat === "wastes" &&
      selectedSectors.includes(el.info.sector)
    ) {
      finalTasks = [...finalTasks, ...el.info.tasks];
    }

    if (bins && el.cat === "bins" && selectedSectors.includes(el.info.sector)) {
      finalTasks = [...finalTasks, ...el.info.tasks];
    }
  }

  return finalTasks;
};

const ListMaker = ({
  label,
  messageList,
  selectedSectors,
  sanitization,
  tentage,
  wastes,
  bins,
  isAlert = false,
}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const sector1 = messageList[0];
    const sector2 = messageList[1];
    const sector3 = messageList[2];
    const sector4 = messageList[3];
    const sector5 = messageList[4];
    const sector6 = messageList[5];
    const sector7 = messageList[6];
    const sector8 = messageList[7];

    const cats = [
      { cat: "sanitization", info: { sector: "Sector 1", tasks: [sector1] } },
      { cat: "sanitization", info: { sector: "Sector 2", tasks: [sector2] } },
      { cat: "tentage", info: { sector: "Sector 1", tasks: [sector3] } },
      { cat: "tentage", info: { sector: "Sector 3", tasks: [sector4] } },
      { cat: "wastes", info: { sector: "Sector 1", tasks: [sector5] } },
      { cat: "wastes", info: { sector: "Sector 3", tasks: [sector6] } },
      { cat: "bins", info: { sector: "Sector 1", tasks: [sector7] } },
      { cat: "bins", info: { sector: "Sector 2", tasks: [sector8] } },
    ];

    const finalTasks = getTasksBySectsCats(
      cats,
      sanitization,
      tentage,
      wastes,
      bins,
      selectedSectors
    );

    setList(() => finalTasks);
  }, [messageList, tentage, sanitization, wastes, selectedSectors, bins]);

  return (
    <div className="w-full" style={{ height: "330px" }}>
      {isAlert && (
        <AlertsScrollList label={label} list={list}></AlertsScrollList>
      )}
      {!isAlert && <ScrollList label={label} list={list}></ScrollList>}
    </div>
  );
};

export default ListMaker;
