import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {black, blue, transition} from "../../../const/styles";
import {Link} from "react-router-dom";

const linkStyled = css`
    ${transition};
    text-decoration: none;
    cursor: pointer;
    
    :hover {
      text-decoration: underline;
    }
`

interface ColorProp {
    color?: string
}

export const ButtonLineStyled = styled.button<ColorProp>`
    color: ${({color}) => color ? color : blue};
    ${linkStyled};
    border: none;
    background: none;
`

export const LinkLineStyled = styled(Link)<ColorProp>`
    color: ${({color}) => color ? color : blue};
    ${linkStyled};
`