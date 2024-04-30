import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../../assets/bwh-logo-shield.png";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import MapIcon from "@mui/icons-material/Map";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TocIcon from "@mui/icons-material/Toc";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Card, CardContent } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import paths from "../common/paths.tsx";
import CollapseImg from "../../assets/collapse.svg";
import { useIdleTimer } from "react-idle-timer";
import { useToast } from "./useToast.tsx";
import "../animations/yellow-underline.css";
import { checkAuth } from "../checkAdminStatus.ts";

import ButtonBlue from "./ButtonBlue.tsx";
import ButtonRed from "./ButtonRed.tsx";
import LoginIcon from "@mui/icons-material/Login";
function NavBar() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const { user } = useAuth0();
  const [isCollapsed, setIsCollapsed] = useState(false);
  //used for delaying the hide of the navBar links
  const [isHidingNavBarInfo, setIsHidingNavBarInfo] = useState(false);

  const [remaining, setRemaining] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authorizedStatus, setStatus] = useState<boolean>(false);

  const { showToast } = useToast();
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const onIdle = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    timeout: 600_000,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);
    if (remaining <= 30 && remaining != 0) {
      showToast(
        "You will be logged out in " + remaining + " seconds due to inactivity",
        "warning",
      );
    }

    return () => {
      clearInterval(interval);
    };
  });

  const handleSetIsCollapsed = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setIsHidingNavBarInfo(false);
    } else {
      setIsCollapsed(true);
      setTimeout(() => {
        setIsHidingNavBarInfo(true);
      }, 350);
    }
  };

  const { logout } = useAuth0();

  const [activePage, setActivePage] = useState(useLocation().pathname);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  function toggleProfileView() {
    setShowProfileMenu(!showProfileMenu);
  }

  useEffect(() => {
    const checkRole = async () => {
      const token = await getAccessTokenSilently();
      const result = await checkAuth(token, "mapdata");
      setStatus(result!);
    };
    checkRole().then();
  }, [getAccessTokenSilently, activePage]);

  interface NavbarItemProps {
    to: string;
    activePage: string;
    setActivePage: (page: string) => void;
    Icon: React.ElementType;
    label: string;
    labelLight?: string;
    collapsed: boolean;
    callback?: () => void;
  }

  const NavbarItem: React.FC<NavbarItemProps> = ({
    to,
    activePage,
    setActivePage,
    Icon,
    label,
    labelLight,
    collapsed,
    callback,
  }) => {
    return (
      <div className="pt-[0.8rem] pb-[0.8rem] ml-[1.5rem] mr-[1.5rem] relative animate-underline-yellow items-center overflow-hidden">
        <Link
          to={to}
          className="inline-block"
          onClick={() => {
            setActivePage(to);
            if (callback != undefined) callback();
          }}
        >
          <div className="flex flex-row text-white items-center justify-center">
            <Icon sx={{ marginRight: "0.4rem", fontSize: "32px" }} />
            <h2
              style={{
                opacity: collapsed ? 0 : 100,
                fontWeight: 500,
              }}
              className="text-lg whitespace-nowrap"
            >
              {label}
            </h2>
            <span>&nbsp;</span> {/* Add space */}
            <h2
              style={{
                opacity: collapsed ? 0 : 1,
                fontWeight: 100,
              }}
              className="text-lg whitespace-nowrap"
            >
              {labelLight}
            </h2>
          </div>
          <span
            className={`flex child absolute bottom-[0.5rem] right-0 w-full h-0.5 bg-highlight transform hover:scale-x-1 transition-transform duration-300 ${activePage === to ? "scale-x-1" : "scale-x-0"}`}
            style={{ transformOrigin: "center" }}
          ></span>
        </Link>
      </div>
    );
  };

  function UserProfileItem(props: { collapsed: boolean }) {
    return (
      <div className=" relative mb-[1rem] mr-[1.5rem] ml-[1rem]  items-center ">
        {showProfileMenu && (
          <>
            <div>
              {!isHidingNavBarInfo && (
                <Card
                  className={`absolute bottom-[2rem] left-[1rem] mb-[1rem]`}
                  style={{ color: "#F6BD39" }}
                >
                  <CardContent className="flex flex-col gap-2">
                    <Link to={paths.PROFILE} className="w-full ">
                      {" "}
                      <ButtonBlue className="flex text-center text-2xl w-full ">
                        View Profile
                      </ButtonBlue>
                    </Link>
                    <ButtonRed
                      onClick={handleLogout}
                      sx={{
                        display: "flex",
                        textAlign: "center",
                        fontSize: "2xl",
                        width: "full",
                        padding: "0.5",
                        backgroundColor: "red",
                        fontFamily: "poppins, sans-serif",
                      }}
                    >
                      Log Out
                    </ButtonRed>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}
        <div>
          <div
            className="flex flex-row text-white items-center z-[100] bg-secondary cursor-pointer "
            onClick={toggleProfileView}
          >
            {isAuthenticated ? (
              <div className="flex flex-row items-center ">
                <img
                  className="w-[2.5rem] h-[2.5rem] object-cover rounded-full mr-4 z-[100]"
                  src={user?.picture}
                  alt="user profile picture"
                />
                <h2
                  style={{
                    opacity: props.collapsed ? 0 : 100,
                    fontWeight: 500,
                  }}
                  className="text-lg whitespace-nowrap z-[100]  "
                >
                  {user?.given_name}
                </h2>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="z-10 bg-offwhite">
      <div
        className={`shadow-lg h-screen relative bg-secondary flex flex-col space-y-[2rem] transition-width ease-in-out duration-500 z-10 ${isCollapsed ? " w-[5rem]" : "w-[14rem]"}`}
        style={{
          borderTopRightRadius: "10px", // Adjust the value as needed
          borderBottomRightRadius: "10px", // Adjust the value as needed
        }}
      >
        {/* Header image */}
        <div className="flex flex-col justify-center overflow-hidden">
          <Link to={paths.HERO} onClick={() => setActivePage(paths.HERO)}>
            <div className="flex mt-[2.5rem] ml-[0.93rem] text-white">
              <img className="h-[57px] pr-[0.7rem]" src={logo} alt="Logo" />
              <h2
                style={{
                  fontWeight: 500,
                }}
                className={
                  isHidingNavBarInfo
                    ? "hidden"
                    : "text-2xl whitespace-nowrap self-center"
                }
              >
                Kiosk
              </h2>
              <span>&nbsp;</span> {/* Add space */}
              <h2
                style={{
                  fontWeight: 100,
                }}
                className={
                  isHidingNavBarInfo
                    ? "hidden"
                    : "text-2xl whitespace-nowrap self-center"
                }
              >
                Menu
              </h2>
            </div>
          </Link>
        </div>
        {/* Navbar items */}
        <div className="flex flex-col gap-[0.7rem]">
          <NavbarItem
            to={paths.HOME}
            activePage={activePage}
            setActivePage={setActivePage}
            Icon={MapIcon}
            label="Map"
            collapsed={isHidingNavBarInfo}
          />
          {isAuthenticated && (
            <>
              <NavbarItem
                to={paths.MAP_EDITOR}
                activePage={activePage}
                setActivePage={setActivePage}
                Icon={EditLocationAltIcon}
                label="Map"
                labelLight="Editor"
                collapsed={isHidingNavBarInfo}
              />
              <NavbarItem
                to={paths.MAP_DATA}
                activePage={activePage}
                setActivePage={setActivePage}
                Icon={AddLocationAltIcon}
                label="Map"
                labelLight="Data"
                collapsed={isHidingNavBarInfo}
              />
              <NavbarItem
                to={paths.SERVICES}
                activePage={activePage}
                setActivePage={setActivePage}
                Icon={VolunteerActivismIcon}
                label="Services"
                collapsed={isHidingNavBarInfo}
              />
              <NavbarItem
                to={paths.SERVICE_LOG}
                activePage={activePage}
                setActivePage={setActivePage}
                Icon={TocIcon}
                label="Service"
                labelLight="Data"
                collapsed={isHidingNavBarInfo}
              />
              <NavbarItem
                to={paths.EMPLOYEE_LOG}
                activePage={activePage}
                setActivePage={setActivePage}
                Icon={AssignmentIndIcon}
                label="Employee"
                labelLight="Data"
                collapsed={isHidingNavBarInfo}
              />
            </>
          )}
          {/*<NavbarItem*/}
          {/*  to={paths.ABOUT_US}*/}
          {/*  activePage={activePage}*/}
          {/*  setActivePage={setActivePage}*/}
          {/*  Icon={GroupsIcon}*/}
          {/*  label="About"*/}
          {/*  labelLight="Us"*/}
          {/*  collapsed={isHidingNavBarInfo}*/}
          {/*/>*/}
        </div>

        {/* Sign out */}
        {isAuthenticated ? (
          <div className="relative flex flex-col flex-grow justify-end">
            <div className="flex flex-col">
              <UserProfileItem collapsed={isHidingNavBarInfo} />
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col flex-grow justify-end">
            <div className="flex flex-col">
              <UserProfileItem collapsed={isHidingNavBarInfo} />
            </div>
          </div>
        )}
        {!isAuthenticated ? (
          <div className="relative flex flex-col flex-grow justify-end">
            <div className="flex flex-col">
              <NavbarItem
                to={paths.MAP_DATA}
                activePage={activePage}
                setActivePage={setActivePage}
                Icon={LoginIcon}
                label={"Sign in"}
                collapsed={isHidingNavBarInfo}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Collapse Button */}
        <div className="absolute top-1/2 transform -translate-y-1/2 right-0 mr-[-12px]">
          <img
            src={CollapseImg}
            className={`cursor-pointer w-7 duration-500 ${isCollapsed ? "" : "rotate-180"}`}
            onClick={handleSetIsCollapsed}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
