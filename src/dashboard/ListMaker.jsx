import React, { useState, useEffect } from "react";
import ScrollList from "./ScrollList";

const getTasksBySectsCats = (
  cats,
  sanitization,
  tentage,
  wastes,
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
}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const sector1 = messageList[0];
    const sector2 = messageList[1];
    const sector3 = messageList[2];
    const sector4 = messageList[3];
    const sector5 = messageList[4];
    const sector6 = messageList[5];

    // const tasks = [
    //   { sector: "Sector 1", info: { cat: "sanitization", tasks: [sector1] } },
    //   { sector: "Sector 2", info: { cat: "sanitization", tasks: [sector2] } },
    //   { sector: "Sector 3", info: { cat: "tentage", tasks: [sector3] } },
    //   { sector: "Sector 4", info: { cat: "tentage", tasks: [sector4] } },
    //   { sector: "Sector 5", info: { cat: "wastes", tasks: [sector5] } },
    //   { sector: "Sector 6", info: { cat: "wastes", tasks: [sector6] } },
    // ];

    const cats = [
      { cat: "sanitization", info: { sector: "Sector 1", tasks: [sector1] } },
      { cat: "sanitization", info: { sector: "Sector 2", tasks: [sector2] } },
      { cat: "tentage", info: { sector: "Sector 1", tasks: [sector3] } },
      { cat: "tentage", info: { sector: "Sector 3", tasks: [sector4] } },
      { cat: "wastes", info: { sector: "Sector 1", tasks: [sector5] } },
      { cat: "wastes", info: { sector: "Sector 3", tasks: [sector6] } },
    ];

    const finalTasks = getTasksBySectsCats(
      cats,
      sanitization,
      tentage,
      wastes,
      selectedSectors
    );

    setList(() => finalTasks);

    //   if (
    //     (!tentage && !sanitization && !wastes) ||
    //     (tentage && sanitization && wastes)
    //   ) {
    //     setList(() => [...messageList]);
    //   } else if (tentage && sanitization) {
    //     const data = [
    //       messageList[0],
    //       messageList[1],
    //       messageList[2],
    //       messageList[3],
    //     ];

    //     setList(() => data);
    //   } else if (sanitization && wastes) {
    //     setList(() => [
    //       messageList[0],
    //       messageList[1],
    //       messageList[4],
    //       messageList[5],
    //     ]);
    //   } else if (tentage && wastes) {
    //     setList(() => [
    //       messageList[2],
    //       messageList[3],
    //       messageList[4],
    //       messageList[5],
    //     ]);
    //   } else if (tentage) {
    //     setList(() => [messageList[0], messageList[1]]);
    //   } else if (sanitization) {
    //     setList(() => [messageList[2], messageList[3]]);
    //   } else if (wastes) {
    //     setList(() => [messageList[4], messageList[5]]);
    //   }
  }, [messageList, tentage, sanitization, wastes, selectedSectors]);

  return (
    <div>
      <ScrollList label={label} list={list}></ScrollList>
    </div>
  );
};

export default ListMaker;
