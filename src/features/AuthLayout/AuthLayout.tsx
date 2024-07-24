import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center min-h-screen flex-1">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
