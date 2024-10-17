import { NavLink } from "react-router-dom";
import HelmetCompo from "../components/HelmetCompo";

const Error = () => {
  return (
    <>
    {/* <h1>Hello</h1> */}
      <HelmetCompo helmet={"Error"}></HelmetCompo>
      <div
        className="w-screen h-screen"
        style={{
          backgroundImage: `url("https://freefrontend.com/assets/img/html-funny-404-pages/GSAP-SVG-Animation-404-Error-Milk-Carton.gif")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <NavLink to="/">
          <button className="btn btn-primary absolute right-10 bottom-10">
            Go home
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Error;