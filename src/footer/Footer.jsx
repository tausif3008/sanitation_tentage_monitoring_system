import React from "react";
import fb from "../assets/Images/icons/facebook.png";
import insta from "../assets/Images/insta.png";
import linkedIn from "../assets/Images/icons/linkedIN.png";
import QRCode from "qrcode.react";

const Footer = ({ dict, lang }) => {
  return (
    <div className="text-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-center gap-4 lg:grid-cols-4">
        <div className="flex flex-col items-start md:items-center">
          <div>
            <div className="text-base font-semibold mb-2">Contact Us</div>
            <div className="flex flex-col text-d4 font-semibold text-sm">
              <span>
                <b>Address:</b> Kumbh Mela Adhikari Triveni Bhawan, Prayagraj,
                Uttar Pradesh.
              </span>
              <span>
                <b>Email:</b> support@kumbhmonitoringsystem.in
              </span>
              <span>
                <b>Phone:</b> +919876543210
              </span>
              <span>
                <b>Emergency:</b> 1920
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-center">
          <div>
            <div className="text-base font-semibold mb-2">
              {dict.web_links[lang]}
            </div>
            <div className="flex flex-col text-d4 text-sm font-semibold">
              <a
                href="#"
                className="hover:underline no-underline text-white cursor-pointer"
              >
                FAQ
              </a>
              <a
                href="#"
                className="hover:underline no-underline text-white cursor-pointer"
              >
                Community Forum
              </a>
              <a
                href="#"
                className="hover:underline no-underline text-white cursor-pointer"
              >
                Technical Support
              </a>
              <a
                href="#"
                className="hover:underline no-underline text-white cursor-pointer"
              >
                Citizen Feedback
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-center">
          <div>
            <div className="text-base font-semibold mb-2">
              {dict.contact[lang]}
            </div>
            <div className="flex text-d4 gap-2 text-lg font-semibold">
              <span className="h-5">
                <img src={linkedIn} className="h-full" alt="" />
              </span>
              <span className="h-5">
                <img src={fb} alt="" className="h-full" />
              </span>
              <span className="h-5">
                <img src={insta} alt="" className="h-full" />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-center">
          <div>
            <div className="text-base font-semibold mb-2">Download App</div>
            <a
              href="https://kumbhpocv2/"
              className="hover:underline cursor-pointer no-underline text-white"
            >
              Link: https://kumbhpocv2/
            </a>
            <div className="flex flex-col w-fit p-2 bg-violet-200 rounded-lg mt-2">
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
