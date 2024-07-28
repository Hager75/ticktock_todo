import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Close,
  ListAltOutlined,
  HomeOutlined,
  PersonRounded
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import { ROUTE_PATHS } from "../../../utils/RoutesPaths";
import { APP_NAME } from "../../../utils/Constants";
import { SideMenuProps, MenuItem } from "./SideMenu.interface";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SideMenu: React.FC<SideMenuProps> = ({
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
  container,
  drawerWidth,
  mainBg
}) => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const activeRoute = (activekey: string) => {    
    return path.includes(activekey);
  };
  const sideMenuItems: MenuItem[] = [
    {
      id: 1,
      title: "Home",
      icon: <HomeOutlined className="text-grey-light" />,
      iconActive: <HomeOutlined className="text-white dark:text-primary-dark" />,
      activekey: "home",
      slug: ROUTE_PATHS.home,
    },
    {
      id: 2,
      title: "Todo list",
      icon: <ListAltOutlined className="text-grey-light" />,
      iconActive: <ListAltOutlined className="text-white dark:text-primary-dark" />,
      activekey:"todo",
      slug: ROUTE_PATHS.todo,

    },
    {
      id: 3,
      title: "Profile",
      icon: <PersonRounded className="text-grey-light" />,
      iconActive: <PersonRounded className="text-white dark:text-primary-dark" />,
      activekey:"my-profile",
      slug: ROUTE_PATHS.profile,

    }
  ];

  const renderSideMenuItems = (device: string) => (
    <div className="side-menu-container scroll-within">
      <DrawerHeader className={`${device === "mobile" && "justify-between"}`}>
        {device === "mobile" ? (
          <>
            <p className="text-white text-md w-full mt-4 text-center font-bold dark:text-primary-dark">
              {APP_NAME}
            </p>
            <IconButton
              onClick={handleDrawerClose}
              className="close-side-menu-icon"
            >
              <Close className="text-white dark:text-primary-dark"/>
            </IconButton>
          </>
        ) : (
          <>
            {open && (
              <p className="text-white text-md w-full mt-4 text-center font-bold dark:text-primary-dark">
                {APP_NAME}
              </p>
            )}
          </>
        )}
      </DrawerHeader>
      <List className="side-menu-list">
        {sideMenuItems.map(
          ({
            id,
            title,
            icon,
            iconActive,
            slug,
            activekey
          }) =>
            <div key={id + title} className="px-4 rounded-2xl">
              <Link to={slug}>
                <ListItem
                  disablePadding
                  sx={{
                    display: "block",
                  }}
                >
                  <ListItemButton
                    selected={activeRoute(activekey)}
                    sx={{
                      minHeight: 30,
                      justifyContent: open ? "initial" : "center",
                      px: 1.5,
                    }}
                    className={`!rounded-2xl ${activeRoute(activekey)
                      ? "text-white dark:text-primary-dark rounded-2xl"
                      : "text-grey-light "
                      }`}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                      }}
                    >
                      {activeRoute(activekey) ? iconActive : icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={title}
                      sx={{
                        display: open ? "block" : "none",
                        textAlign: "start",
                      }}
                      className={`px-2 ${activeRoute(activekey)
                        ? "text-white dark:text-primary-dark"
                        : "text-grey-light"
                        }`}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </div>

        )}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        onTransitionEnd={handleDrawerTransitionEnd}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderTopRightRadius: "2rem",
            borderBottomRightRadius: "2rem",
            backgroundColor:mainBg,
          },
        }}
      >
        {renderSideMenuItems("mobile")}
      </Drawer>
      <Drawer
        variant="permanent"
        open={open}
        onClose={() => setOpen(false)}
        onTransitionEnd={handleDrawerTransitionEnd}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: open ? drawerWidth : "auto",
            overflowX: "hidden",
            borderTopRightRadius: "2rem",
            borderBottomRightRadius: "2rem",
            backgroundColor: mainBg,
          },
        }}
      >
        {renderSideMenuItems("desktop")}
      </Drawer>
    </Box>
  );
};

export default SideMenu;
