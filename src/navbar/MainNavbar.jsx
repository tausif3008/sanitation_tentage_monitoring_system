import NavHead from "./NavHead";
import Navbar from "./Navbar";

const MainNavbar = (props) => {
  return (
    <div>
      <NavHead {...props}></NavHead>
      <Navbar {...props}></Navbar>
    </div>
  );
};

export default MainNavbar;
