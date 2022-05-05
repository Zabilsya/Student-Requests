import styled from "@emotion/styled";
import {flexFullCenter, flexSpace, red, transition} from "../../../const/styles";
import {css} from "@emotion/react";

const buttonsStyle = css`
    ${flexFullCenter};
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    ${transition};
`

export const EditDeleteBlockStyled = styled.div`
    ${flexSpace};
    gap: 6px;
    background: #F0F8FF;
    border-radius: 10px;
    padding: 6px;
`

export const EditButton = styled.button`
    ${buttonsStyle};
    background: #27AE60;
`

export const DeleteButton = styled.button`
    ${buttonsStyle};
    background: ${red};
`