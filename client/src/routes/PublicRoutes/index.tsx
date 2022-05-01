import React, {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {RoutesList} from "../../const";
import Login from "../../pages/Login";
import ChangePassword from "../../pages/ChangePassword";
import PublicLayout from "../../components/layouts/PublicLayout";

const PublicRoutes: FC = () => {
    return (
        <PublicLayout>
            <Routes>
                <Route path={RoutesList.Login} element={<Login />} />
                <Route path={RoutesList.ChangePassword} element={<ChangePassword />} />
                <Route path="*" element={<Navigate to={RoutesList.Login} />} />
            </Routes>
        </PublicLayout>
    )
}

export default PublicRoutes