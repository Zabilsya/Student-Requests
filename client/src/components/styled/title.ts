import styled from "@emotion/styled";
import {black, blue} from "../../const/styles";

interface TitleProps {
    color?: 'black' | 'blue'
}

export const Title = styled.h1<TitleProps>`
    font-size: 24px;
    font-weight: 700;
    color: ${({color}) => color === 'blue' ? blue : black};
    margin: 0;
    line-height: 1.6;
`

export const SubTitle = styled.h2<TitleProps>`
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 15px 0;
    color: ${({color}) => color === 'blue' ? blue : black};
    line-height: 1.6;
`
