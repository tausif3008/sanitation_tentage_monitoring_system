import React from "react";
import QRCode from "qrcode.react";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { DICT } from "../urils/dictionary";

const Footer = ({ lang = "en" }) => {
  const dict = DICT;
  return (
    <div className="">
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 justify-between  gap-10 gap-y-8  lg:grid-cols-4">
        <div className="flex flex-col items-start md:items-center">
          <div>
            <div className=" text-base font-semibold mb-2 text-orange-400">
              {dict.emmergency_no[lang]}
            </div>
            <div className="flex flex-col font-semibold text-sm">
              <span>
                <RightOutlined /> {dict.police[lang]} : 100
              </span>
              <span>
                <RightOutlined /> {dict.ambulance[lang]} : 108{" "}
              </span>
              <span>
                <RightOutlined /> {dict.helpline[lang]} : 1098
              </span>
              <span>
                <RightOutlined /> {dict.fire[lang]} : 101
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-center">
          <div>
            <div className=" text-base font-semibold mb-2 text-orange-400">
              {dict.web_links[lang]}
            </div>
            <div className="flex flex-col text-sm font-semibold">
              <span>
                <RightOutlined /> {dict.up_police[lang]}
              </span>
              <span>
                <RightOutlined /> {dict.faq[lang]}
              </span>
              <span>
                <RightOutlined /> {dict.community_forum[lang]}
              </span>
              <span>
                <RightOutlined /> {dict.technical_support[lang]}
              </span>
              <span>
                <RightOutlined /> {dict.citizen_feedback[lang]}
              </span>
            </div>
          </div>
        </div>
        <div className="flex text-sm flex-col w-full items-start">
          <div>
            <div className="text-base font-semibold mb-2 text-orange-400">
              {dict.contact[lang]}
            </div>
          </div>
          <div className="w-full font-semibold">
            <div className="flex gap-2">
              <div className="font-semibold">
                <EnvironmentOutlined className="text-orange-400 text-lg" />{" "}
              </div>
              <div className="break-words w-full">
                {dict.address_footer[lang]}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="font-semibold">
                <MailOutlined className="text-orange-400 text-lg" />{" "}
              </div>
              <div className="break-words w-full inline-block">
                {dict.email_footer[lang]}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="font-semibold">
                <PhoneOutlined
                  className="text-orange-400 
              xt-lg"
                />{" "}
              </div>
              <div className="break-words w-full inline-block">
                {dict.phone_number[lang]}{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-center">
          <div>
            <div className=" text-base font-semibold mb-2 text-orange-400">
              {dict.scan_qr[lang]}
            </div>
            <div className="flex flex-col w-fit p-2 bg-violet-200 rounded-lg">
              <QRCode
                size={70}
                value={"https://kumbhlostandfound.in/kumbh-v2/"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
