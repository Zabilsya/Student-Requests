import styled from "@emotion/styled";
import {blue, defaultBlockStyles, flexColumn, transition} from "../../../const/styles";
import {Link} from "react-router-dom";

export const NewsCardWrapper = styled(Link)`
    ${flexColumn};
    ${defaultBlockStyles};
    ${transition};
    gap: 20px;
    cursor: pointer;
    
    :hover {
        transform: scale(1.03);
    }
`

export const NewsCardTop = styled.div`
    ${flexColumn};
    gap: 10px;
    padding: 20px 20px 0 20px;
`

export const NewsCardText = styled.p`
    color: #5C5C5C;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
`

export const NewsCardMore = styled.p`
    color: ${blue};
    
    :hover {
        text-decoration: underline;
    }
`

export const NewsCardImage = styled.img`
    display: block;
    width: 100%;
    height: 270px;
`

export const NewsCardBottom = styled.div`
    color: #5C5C5C;
    font-size: 10px;
    padding: 0 20px 20px 20px;
`