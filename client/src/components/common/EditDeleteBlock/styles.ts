import styled from "@emotion/styled";
import {darken, flexFullCenter, flexSpace, red, transition} from "../../../const/styles";
import {css} from "@emotion/react";

const buttonsStyle = css`
    ${flexFullCenter};
    width: 29px;
    height: 29px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    ${transition};
`

interface EditDeleteBlockStyledProps {
    inTable?: boolean
}

export const EditDeleteBlockStyled = styled.div<EditDeleteBlockStyledProps>`
    width: fit-content;
    ${flexSpace};
    gap: 8px;
    background: #F0F8FF;
    border-radius: 10px;
    padding: 6px;
    ${({inTable}) => inTable && "margin-left: auto"}
`

export const EditButton = styled.button`
    ${buttonsStyle};
    background: #27AE60;
    
    :hover {
        background: #39c775;
    }
`

export const DeleteButton = styled.button`
    ${buttonsStyle};
    background: ${red};
    
    :hover {
        background: #ff7a7a;
    }
`