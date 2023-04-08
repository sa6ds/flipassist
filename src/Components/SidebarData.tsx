import React from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <GridViewOutlinedIcon className="mr-5 w-8" />,
    link: "/dashboard",
  },
  {
    title: "Inventory",
    icon: <Inventory2OutlinedIcon className="mr-5 w-8" />,
    link: "/inventory",
  },
  {
    title: "Calculators",
    icon: <CalculateOutlinedIcon className="mr-5 w-8" />,
    link: "/calculators",
  },
  {
    title: "Tools",
    icon: <HandymanOutlinedIcon className="mr-5 w-8" />,
    link: "/tools",
  },
  {
    title: "Monitors",
    icon: <MonitorHeartOutlinedIcon className="mr-5 w-8" />,
    link: "/monitors",
  },
];