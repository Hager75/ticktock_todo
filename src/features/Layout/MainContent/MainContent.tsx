import React from "react";
import { Box, Toolbar } from "@mui/material";

interface MainContentProps {
  children: React.ReactNode;
  drawerWidth: number;
  mainBg: string;
}

const MainContent: React.FC<MainContentProps> = ({ children, drawerWidth, mainBg }) => {

  const customStyle = {
    mt: "20px",
    flexGrow: 1,
    transition: (theme: any) =>
      theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    width: {
      xs: "100%",
      sm: `calc(100% - ${drawerWidth}px)`,
    },
    minHeight: `calc(100vh - 20px)`,
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Box component="main" sx={customStyle} className={`bg-${[mainBg]}`}>
      <div className="px-10 mt-5">
        <Toolbar />
        {children}
      </div>
      <footer className="w-full text-center p-3 bg-gray-lighter text-gray-dark mt-auto">
        © copyright
      </footer>
    </Box>
  );
};

export default MainContent;
