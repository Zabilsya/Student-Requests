import styled from '@emotion/styled'
import {blue, flexColumn, lightBlue, lightGray, red, transition, white} from "../../../const/styles";

export const Label = styled.label`
    ${flexColumn};
    width: 100%;
    gap: 5px;
`;

export const LabelTitle = styled.span`
    color: ${lightGray};
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    letter-spacing: 0.05em;
    text-transform: uppercase;
`;

interface InputProps {
    error: string | null
}

export const InputStyled = styled.input<InputProps>`
    border: 1px solid ${({error}) => error ? red : lightBlue};
    border-radius: 10px;
    background: ${lightBlue};
    padding: 17px 15px;
    outline: none;
    ${transition};
  
    :hover {
        border-color: ${blue}
    }
    
    :focus {
        background: ${white};
        border-color: ${blue};
        box-shadow: 0 0 0 3px rgba(0, 91, 171, 0.15);
    }
`;

export const Error = styled.span`
    color: ${red}
`;