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
`
