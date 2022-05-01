import React from "react";
import PublicRoutes from "./PublicRoutes";
import StudentRoutes from "./StudentRoutes";
import WorkerRoutes from "./WorkerRoutes";
import AdminRoutes from "./AdminRoutes";
import {UserTypes} from "../const";

const useRoutes = (userType: number | boolean) => {
    switch (userType) {
        case UserTypes.Admin:
            return <AdminRoutes />
        case UserTypes.Worker:
            return <WorkerRoutes />
        case UserTypes.Student:
            return <StudentRoutes />
        default:
            return <PublicRoutes />
    }
}

export default useRoutes