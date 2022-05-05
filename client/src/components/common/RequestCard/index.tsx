import React, {FC} from 'react';
import {
    RequestCardHeader,
    RequestCardMore,
    RequestCardStyled
} from "./styles";
import {IRequest} from "../../../store/reducers/Requests/Interfaces";
import {RoutesList, UserTypes} from "../../../const";
import StatusCard from "../StatusCard";
import RequestMainData from "../RequestMainData";

interface Props extends IRequest {
    userType: UserTypes
}

const RequestCard: FC<Props> = (props) => {
    const { id, status } = props

    return (
        <RequestCardStyled to={RoutesList.Requests + `\\${id}`} status={status.id}>
            <RequestCardHeader>
                <StatusCard {...status} />
                <RequestCardMore>Подробнее</RequestCardMore>
            </RequestCardHeader>

            <RequestMainData {...props} />

        </RequestCardStyled>
    );
};

export default RequestCard