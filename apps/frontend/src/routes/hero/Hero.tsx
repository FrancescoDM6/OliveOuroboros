import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner.tsx";
import "./Hero.css";
import "./animatedUnderlineWhite.css";
import "./animatedAbracadabra.css";
import "./animatedPulse.css";
import { useNavigate } from "react-router-dom";
import paths from "../../common/paths.tsx";
import { AnimatePresence, motion } from "framer-motion";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AttributionIcon from "@mui/icons-material/Attribution";
import Tooltip from "@mui/material/Tooltip";

function Hero() {
  const [date, setDate] = useState(new Date().toLocaleString());
  const [bannerOpen, setBannerOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setDate(date.toLocaleString());
    }, 1000);
    setTimeout(() => {
      setBannerOpen(false);
    }, 7500);
  }, []);

  const bannerElement = (
    <AnimatePresence>
      {bannerOpen && (
        <motion.div
          key="banner"
          className="absolute top-0 left-0 w-full flex justify-center items-center h-[15vw]"
        >
          <Banner>{bannerChildren}</Banner>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex w-screen h-screen">
      {bannerElement}
      <div className="h-screen w-[65%] relative hero-hospital-image">
        <div className="h-full w-full flex items-center">
          <div className="flex flex-col absolute left-[5%] animatedAbracadabra">
            <h2 className="text-[3.5vw] text-white font-bold">Welcome</h2>
            <h2 className="text-[1.75vw] text-white font-light">
              Brigham & Women's Hospital
            </h2>
          </div>
          <h2 className="self-start absolute top-[2%] left-[2%] text-[1.75vw] text-white font-light">
            {date}
          </h2>
        </div>
        <div className="h-full flex items-end absolute bottom-[2%] left-[2%]">
          <div className="flex gap-[3vh]">
            <div
              className="text-white cursor-pointer animatedUnderlineWhite"
              onClick={() => navigate(paths.ABOUT_US)}
            >
              <Tooltip title="About Us" placement="top" arrow>
                <InfoOutlinedIcon sx={iconStyles} />
              </Tooltip>
            </div>
            <div
              className="text-white cursor-pointer animatedUnderlineWhite"
              onClick={() => navigate(paths.CREDIT)}
            >
              <Tooltip title="Credits" placement="top" arrow>
                <AttributionIcon sx={iconStyles} />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-screen w-[35%] relative hero-map-image cursor-pointer border-l-2 border-solid border-black"
        onClick={() => navigate(paths.HOME)}
      >
        <div className="h-full w-full flex items-center">
          <div className="flex flex-col absolute left-[5%] animatedAbracadabra hookText">
            <h2 className="text-[3.5vw] text-white font-bold">Find your way</h2>
            <h2 className="text-[1.75vw] text-white font-light self-start">
              Tap here to enter
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

const iconStyles = {
  fontSize: "3rem",
} as const;

const bannerChildren: JSX.Element = (
  <p className="text-[0.8vw]">
    <span className="font-bold">Disclaimer: </span>This is a project for WPI CS
    3733 Software Engineering (Prof. Wong) and is not the actual Brigham &
    Women's Hospital Website.
  </p>
);

export default Hero;
