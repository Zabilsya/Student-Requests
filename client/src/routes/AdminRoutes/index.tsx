import React, {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {RoutesList} from "../../const";
import Users from "../../pages/Users";
import RequestTemplates from "../../pages/RequestTemplates";
import Requests from "../../pages/Requests";
import News from "../../pages/News";
import Queue from "../../pages/Queue";
import Schedule from "../../pages/Schedule";
import Contacts from "../../pages/Contacts";
import PrivateLayout from "../../components/layouts/PrivateLayout";
import Profile from "../../pages/Profile";
import RequestDetail from "../../pages/RequestDetail";
import NewsDetail from "../../pages/NewsDetail";

const AdminRoutes: FC = () => {
    return (
        <PrivateLayout>
            <Routes>
                <Route path={RoutesList.RequestTemplates} element={<RequestTemplates />} />
                <Route path={RoutesList.Users} element={<Users />} />
                <Route path={RoutesList.Queue} element={<Queue />} />

                <Route path={RoutesList.Requests} element={<Requests />} />
                <Route path={RoutesList.DetailRequest} element={<RequestDetail />} />

                <Route path={RoutesList.News} element={<News />} />
                <Route path={RoutesList.DetailNews} element={<NewsDetail />} />
                <Route path={RoutesList.Schedule} element={<Schedule />} />
                <Route path={RoutesList.Contacts} element={<Contacts />} />
                <Route path={RoutesList.Profile} element={<Profile />} />
                <Route path="*" element={<Navigate to={RoutesList.Requests} />} />
            </Routes>
        </PrivateLayout>
    );
};

export default AdminRoutes