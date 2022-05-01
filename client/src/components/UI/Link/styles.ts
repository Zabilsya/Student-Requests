import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {blue, transition} from "../../../const/styles";
import {Link} from "react-router-dom";

const linkStyled = css`
    color: ${blue};
    ${transition};
    text-decoration: none;
    cursor: pointer;
    
    :hover {
      text-decoration: underline;
    }
`

export const ButtonLineStyled = styled.button`
    ${linkStyled};
    border: none;
    background: none;
`

export const LinkLineStyled = styled(Link)`
    ${linkStyled}
`