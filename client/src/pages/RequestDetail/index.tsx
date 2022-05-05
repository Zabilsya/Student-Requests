import React, {useEffect, useState} from 'react';
import {
    RequestDetailFiles,
    RequestDetailHeader,
    RequestDetailStyled
} from "./styles";
import {requestsAPI} from "../../services/RequestsService";
import {useLocation} from "react-router-dom";
import browserHistory from "../../routes/history";
import {RoutesList} from "../../const";
import {MarginWrapper} from "../../components/styled/wrappers";
import {SubTitle} from "../../components/styled/title";
import Document from "../../components/common/Document";
import RequestMainData from "../../components/common/RequestMainData";
import {useAppSelector} from "../../hooks/redux";
import Chat from "../../components/common/Chat";

const RequestDetail = () => {
    const location = useLocation()
    const [getDetailRequest, {data: request, isSuccess, isError}] = requestsAPI.useLazyGetDetailRequestsQuery()
    const { profile, webSocket } = useAppSelector(state => state.authReducer)

    useEffect(() => {
        if (webSocket && request) {
            webSocket.on(`triggerToClient:${request.id}`, () => {
                getDetailRequest(request.id)
            })
        }
    }, [isSuccess])

    useEffect(() => {
        const id = location.pathname.split(RoutesList.Requests + '/')[1]
        getDetailRequest(id)
    }, [])

    useEffect(() => {
        if (isError) {
            browserHistory.push(RoutesList.Requests)
        }
    }, [isError])

    return (
        <>
            {profile && isSuccess && request &&
                <RequestDetailStyled status={request.status.id}>
                    <RequestDetailHeader>
                    </RequestDetailHeader>

                    <MarginWrapper top="30px" bottom="50px">
                        <RequestMainData userType={profile.user_type} {...request} />
                    </MarginWrapper>

                    {request.files.length > 0 &&
                        <>
                            <SubTitle color="black">Файлы</SubTitle>
                            <RequestDetailFiles>
                                {request.files.map(file => (
                                    <Document
                                        file_name={file.file_name}
                                        file_path={process.env.REACT_APP_API_URL + '/' + file.file_path}
                                        key={file.id}
                                    />
                                ))}
                            </RequestDetailFiles>
                        </>
                    }

                    <MarginWrapper top="50px">
                        <SubTitle color="black">Комментарии</SubTitle>
                        <Chat requestId={request.id} messages={request.messages} />
                    </MarginWrapper>
                </RequestDetailStyled>
            }
        </>
    );
};

export default RequestDetail