import { Outlet } from "react-router-dom";

import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";

const AuthLayout = (): JSX.Element => {

  return (
    <div className="flex flex-col min-h-screen flex-1">
      <ThemeSwitcher />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
