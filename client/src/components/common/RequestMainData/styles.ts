import styled from "@emotion/styled";
import {black, blue, flexColumn, lightGray} from "../../../const/styles";

export const RequestMainDataWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
`

export const RequestData = styled.div`
    ${flexColumn};
    flex-basis: 30%;
    gap: 6px;
`

export const RequestDataTitle = styled.p`
    color: ${lightGray};
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
`

export const RequestDataText = styled.p`
    color: ${black};
    font-size: 16px;
`