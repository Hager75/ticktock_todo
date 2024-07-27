import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ROUTE_PATHS } from "../utils/RoutesPaths";
import { useAppSelector } from "../store";

import Layout from "../features/Layout/Layout";
import AuthLayout from "../features/AuthLayout/AuthLayout";
import Login from "../features/AuthLayout/Login/Login";
import Register from "../features/AuthLayout/Register/Register";
import Home from "../features/Home/Home";
import Todo from "../features/Todo/Todo";
import AddEditTask from "../features/Todo/AddEditTask/AddEditTask";
import Profile from "../features/Profile/Profile";

const AppRoutes = () => {
    const isAuth = useAppSelector((state)=>state.auth?.userInfo?.token);    
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
                    <Route path={ROUTE_PATHS.register}>
                        <Route index element={<Register />} />
                    </Route>

                </Route>
                <Route
                    element={isAuth ? <Layout /> : <Navigate to={ROUTE_PATHS.login} />}
                >
                    <Route path={ROUTE_PATHS.home}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route path={ROUTE_PATHS.todo}>
                        <Route index element={<Todo />} />
                    </Route>
                    <Route path={ROUTE_PATHS.addTask}>
                        <Route index element={<AddEditTask />} />
                    </Route>
                    <Route path={ROUTE_PATHS.editTask}>
                        <Route index element={<AddEditTask />} />
                    </Route>
                    <Route path={ROUTE_PATHS.profile}>
                        <Route index element={<Profile />} />
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
