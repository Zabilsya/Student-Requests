import React, {FC, ReactNode} from "react";
import {ButtonStyled, ButtonVariant} from "./styles";
import {ReactClick} from "../../../types/react";

interface Props extends ReactClick<HTMLButtonElement> {
    type: 'submit' | 'button'
    variant?: ButtonVariant
    fullWidth?: boolean
    disabled?: boolean
    children?: ReactNode | null
}

const Button: FC<Props> = props => {
    return (
        <ButtonStyled {...props}>
            {props.children}
        </ButtonStyled>
    )
}

export default Button