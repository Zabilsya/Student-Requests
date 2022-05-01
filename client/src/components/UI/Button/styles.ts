import styled from '@emotion/styled'
import {black, blue, gray, transition, white} from "../../../const/styles";
import {css} from "@emotion/react";

export type ButtonVariant = 'primary' | 'small' | 'outline'

interface Props {
    variant?: ButtonVariant,
    fullWidth?: boolean
}

const primaryStyle = () => css`
    color: ${white};
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: ${blue};
    border: 1px solid ${blue};
    padding: 17px 50px;
    
    :hover {
        background: #1377CE;
        border-color: #1377CE;
    }
    
    :active {
        background: #084A84;
        border-color: #084A84;
    }
`

const smallStyle = () => css`
    color: ${white};
    background: ${blue};
    border: 1px solid ${blue};
    padding: 10px 25px;
    
    :hover {
        background: #1377CE;
        border-color: #1377CE;
    }
    
    :active {
        background: #084A84;
        border-color: #084A84;
    }
`

const outlineStyle = () => css`
    color: ${black};
    letter-spacing: 1px;
    font-weight: 700;
    text-transform: uppercase;
    background: ${white};
    border: 1px solid ${gray};
    padding: 17px 50px;
    
    :hover {
        color: ${blue};
        border-color: ${blue};
    }
`

const getButtonStyle = (variant?: ButtonVariant) => {
    switch (variant) {
        case "small":
            return smallStyle
        case "outline":
            return outlineStyle
        default:
            return primaryStyle
    }
}

export const ButtonStyled = styled.button<Props>`
    ${({fullWidth}) => fullWidth && 'width: 100%'};
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    ${transition};
    ${({variant}) => getButtonStyle(variant)};
    
    :disabled {
        opacity: .5;
        cursor: not-allowed;
    }
`;