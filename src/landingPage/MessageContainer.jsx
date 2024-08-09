import React from "react";
import Marquee from "react-fast-marquee";
import person1 from "../assets/Images/persons/person1.png";
import person2 from "../assets/Images/persons/person2.png";
import person3 from "../assets/Images/persons/person3.png";
import person4 from "../assets/Images/persons/person4.png";
import person5 from "../assets/Images/persons/person5.jpeg";
import person6 from "../assets/Images/persons/person6.png";
import person7 from "../assets/Images/persons/person7.png";
import { Divider } from "antd";
import { useOutletContext } from "react-router";

const items = [
  { img: person1, name: "विजय", age: "40" },
  { img: person2, name: "सीता", age: "50" },
  { img: person3, name: "राजेश", age: "30" },
  { img: person4, name: "लक्ष्मी", age: "45" },
  { img: person5, name: "गोपाल", age: "35" },
  { img: person6, name: "राधा", age: "25" },
  { img: person7, name: "कृष्ण", age: "32" },
];

const MessageContainer = () => {
  const [dict, lang] = useOutletContext();
  return (
    <div className="mt-3">
      <div className=" text-green-700 font-semibold text-2xl">
        {dict.recent_load_found[lang]}{" "}
      </div>
      <Divider className="bg-green-500 mt-0" />
      <Marquee>
        {items.map((el) => {
          return (
            <div key={el.name} className="ml-4 bg-green-100">
              <div className="">
                <img
                  src={el.img}
                  className="overflow-hidden w-28 h-28 p-3"
                  alt={el.name}
                />
                <div className="text-center pb-2 w-full  text-sm font-semibold font-devnagri text-teal-950">
                  <div className="">
                    {el.name} ({el.age})
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default MessageContainer;
