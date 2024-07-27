import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

import { THEME_MODE } from "../../utils/Constants";
import { useAppSelector } from "../../store";
import Navbar from "./Navbar/Navbar";
import SideMenu from "./SideMenu/SideMenu";
import MainContent from "./MainContent/MainContent";

const drawerWidth = 240;
interface Props {
  window?: () => Window;
}

const Layout: React.FC<Props> = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
    const themeMode = useAppSelector((state) => state.userPreferences?.theme);

  return (
    <Box sx={{ display: "flex", backgroundColor: themeMode=== THEME_MODE.dark? "#212327"  :"#fafaff" }}>
      <Navbar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        mainBg={themeMode=== THEME_MODE.dark? "#373a40"  :"#fff"}
      />
      <SideMenu
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        container={container}
        drawerWidth={drawerWidth}
        mainBg={themeMode=== THEME_MODE.dark? "#373a40"  :"#2B2374" }

      />
      <MainContent drawerWidth={drawerWidth} mainBg={themeMode=== THEME_MODE.dark? "#212327"  :"#fafaff"}>
        <Outlet />
      </MainContent>
    </Box>
  );
};

export default Layout;
