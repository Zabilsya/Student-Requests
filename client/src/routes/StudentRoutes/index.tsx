import React, {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {RoutesList} from "../../const";
import Requests from "../../pages/Requests";
import News from "../../pages/News";
import PrivateLayout from "../../components/layouts/PrivateLayout";

const StudentRoutes: FC = () => {
    return (
        <PrivateLayout>
            <Routes>
                <Route path={RoutesList.Requests} element={<Requests />} />
                <Route path={RoutesList.News} element={<News />} />
                <Route path="*" element={<Navigate to={RoutesList.Requests} />} />
            </Routes>
        </PrivateLayout>
    );
};

export default StudentRoutes