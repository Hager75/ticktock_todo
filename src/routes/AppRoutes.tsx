import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ROUTE_PATHS } from "../utils/RoutesPaths";
import Layout from "../features/Layout/Layout";
import Home from "../features/Home/Home";
import AuthLayout from "../features/AuthLayout/AuthLayout";
import Login from "../features/AuthLayout/Login/Login";

const AppRoutes = () => {
    const isAuth = false;

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        !isAuth ? (
                            <AuthLayout />
                        ) : (
                            <Navigate to={ROUTE_PATHS.home} />
                        )
                    }
                >
                    <Route path={ROUTE_PATHS.login}>
                        <Route index element={<Login />} />
                    </Route>
                </Route>
                <Route
                    element={isAuth ? <Layout /> : <Navigate to={ROUTE_PATHS.login} />}
                >
                    <Route path={ROUTE_PATHS.home}>
                        <Route index element={<Home />} />
                    </Route>
                </Route>

                <Route
                    path={"*"}
                    element={<Navigate to={ROUTE_PATHS.home} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
