import styled from "@emotion/styled";
import {blue, flexFullCenter, lightBlue, transition, white} from "../../../const/styles";
import {css} from "@emotion/react";

interface DocumentStyledProps {
    fullWidth?: boolean
}

export const DocumentStyled = styled.a<DocumentStyledProps>`
    position: relative;
    display: flex;
    align-items: flex-end;
    gap: 10px;
    width: ${({fullWidth}) => fullWidth ? '100%' : 'fit-content'};
    color: ${blue};
    background: ${lightBlue};
    border-radius: 10px;
    padding: 10px 15px;
    ${transition};
    
    svg {
        ${transition};
    }
    
    :hover {
        color: ${white};
        background: ${blue};
        
        .doc__image {
            color: ${white} !important;
        } 
        
        button {
            visibility: visible !important;
            opacity: 1 !important;
        }
    }
`

export const DocumentDeleteButton = styled.button`
    position: absolute;
    top: -12px;
    right: -12px;
    ${flexFullCenter};
    border: none;
    background: none;
    visibility: hidden;
    opacity: 0;
    cursor: pointer;
    ${transition};
`