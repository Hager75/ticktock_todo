import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountBox, KeyboardArrowDownOutlined } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../../store/index";
import ThemeSwitcher from "../../../components/ThemeSwitcher/ThemeSwitcher";
import DropdownMenu from "../../../components/DropdownMenu/DropdownMenu";
import { logoutRequest } from "../../../store/auth/authSlice";

interface NavbarProps {
  handleDrawerToggle: () => void;
  drawerWidth: number;
  mainBg:string;
}

const Navbar: React.FC<NavbarProps> = ({ handleDrawerToggle, drawerWidth,mainBg }) => {
  const userName = useAppSelector((state) => state.auth.userInfo?.username);
  const dispatch = useAppDispatch();

  const handleProfileClick = () => {
    // Handle profile menu item click
    // navigate(ROUTE_PATHS.profile);
  };
const handleLogout = ()=>{
  dispatch(logoutRequest())
}
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px - 2rem)` },
        mx: { sm: `1rem` },
        my: { sm: `1rem` },
        borderRadius: { sm: "1rem" },
        backgroundColor: mainBg,
        color: "#76798E",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <div className="w-full flex justify-between items-center">
          <div>
            <Typography className="dark:text-white text-regular">
              Hello, {userName}
            </Typography>
          </div>

          <div className="flex items-center">
              <AccountBox sx={{ fontSize: "3rem" }} className="dark:text-white" />
              <ThemeSwitcher iconClassName="px-1"/>
            <div>
              <DropdownMenu
                buttonText={<KeyboardArrowDownOutlined />}
                menuItems={[{ label: "Profile", onClick: handleProfileClick },{label: "Logout", onClick: handleLogout}]}
              />
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
