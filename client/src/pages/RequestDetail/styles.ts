import styled from "@emotion/styled";
import {defaultBlockStyles, flexColumn, flexSpace, white} from "../../const/styles";
import {RequestStatuses, RequestStatusesColors, UserTypes} from "../../const";

interface RequestDetailStyledProps {
    status: RequestStatuses
}

export const RequestDetailStyled = styled.div<RequestDetailStyledProps>`
    ${defaultBlockStyles};
    padding: 30px;
    border-width: 1px;
    border-style: solid;
    border-color: ${({status}) => {
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

export const RequestDetailHeader = styled.div`
    ${flexSpace};
`

export const RequestDetailDataWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
`

export const RequestDetailFiles = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
`