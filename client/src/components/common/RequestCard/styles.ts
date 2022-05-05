import styled from "@emotion/styled";
import {black, blue, defaultBlockStyles, flexColumn, flexSpace, lightGray} from "../../../const/styles";
import {RequestStatuses, RequestStatusesColors} from "../../../const";
import {Link} from "react-router-dom";

interface RequestCardStyledProps {
    status: RequestStatuses
}

export const RequestCardStyled = styled(Link)<RequestCardStyledProps>`
    width: 100%;
    ${defaultBlockStyles};
    padding: 20px;
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
    }
};
`

export const RequestCardHeader = styled.div`
    ${flexSpace};
    margin-bottom: 20px;
`


export const RequestCardMore = styled.span`
    color: ${blue};
    font-size: 12px;
    text-decoration: underline;
`