import styled from "@emotion/styled";
import {black, defaultBlockStyles, flexColumn, flexSpace} from "../../const/styles";

export const NewsDetailWrapper = styled.div`
    ${flexColumn};
    ${defaultBlockStyles};
    padding: 30px;
    gap: 25px;
`

export const NewsDetailHeader = styled.div`
    ${flexSpace};
    align-items: center;
`

export const NewsDetailDateTime = styled.div`
    color: #5C5C5C;
`

export const NewsDetailText = styled.div`
    color: ${black};
    line-height: 150%;
    font-size: 16px;
`

export const NewsDetailFiles = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
`

export const NewsDetailImage = styled.img`
    display: block;
    width: 100%;
    height: 470px;
    border-radius: 10px;
`

export const NewsDetailButtons = styled.div`
    width: 100%;
    padding-top: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
`