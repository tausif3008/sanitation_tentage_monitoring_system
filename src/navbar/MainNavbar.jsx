import { useState, useEffect } from "react";
import NavHead from "./NavHead";
import Navbar from "./Navbar";

const MainNavbar = (props) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <NavHead {...props}></NavHead>
      <div
        className={`${
          isSticky
            ? "fixed top-0 left-0 w-full bg-white shadow-lg z-50 transition-all navbar-transition"
            : ""
        }`}
        style={{ transition: "10s" }}
      >
        <Navbar {...props}></Navbar>
      </div>{" "}
    </div>
  );
};

export default MainNavbar;
