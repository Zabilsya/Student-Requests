import React, {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {RoutesList} from "../../const";
import Queue from "../../pages/Queue";
import Requests from "../../pages/Requests";
import News from "../../pages/News";
import PrivateLayout from "../../components/layouts/PrivateLayout";
import RequestDetail from "../../pages/RequestDetail";

const WorkerRoutes: FC = () => {
    return (
        <PrivateLayout>
            <Routes>
                <Route path={RoutesList.Queue} element={<Queue />} />
                <Route path={RoutesList.Requests} element={<Requests />} />
                <Route path={RoutesList.DetailRequest} element={<RequestDetail />} />
                <Route path={RoutesList.News} element={<News />} />
                <Route path={RoutesList.DetailRequest} element={<RequestDetail />} />
                <Route path="*" element={<Navigate to={RoutesList.Requests} />} />
            </Routes>
        </PrivateLayout>
    );
};

export default WorkerRoutes