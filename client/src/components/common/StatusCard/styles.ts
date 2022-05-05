import styled from "@emotion/styled";
import {black, flexFullCenter, gray} from "../../../const/styles";
import {RequestStatuses, RequestStatusesColors} from "../../../const";


export const StatusCardStyled = styled.div`
    ${flexFullCenter};
    border-radius: 10px;
    border: 1px solid ${gray};
    padding: 6px 12px;
    gap: 5px;
`

export const StatusCardText = styled.span`
    line-height: 1;
    font-size: 12px;
    color: ${black};
`

interface StatusCardCircleProps {
    status: RequestStatuses
}

export const StatusCardCircle = styled.div<StatusCardCircleProps>`
    width: 8px;
    min-width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({status}) => {
    switch (status) {
        case RequestStatuses.Waiting:
            return RequestStatusesColors.Waiting
        case RequestStatuses.InProgress:
            return RequestStatusesColors.InProgress
        case RequestStatuses.Closed:
            return RequestStatusesColors.Closed
    }
}}
`


