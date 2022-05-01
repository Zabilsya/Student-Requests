import React, {FC} from "react";
import {Label, LabelTitle, InputStyled, Error} from "./styles";
import {ReactChange} from "../../../types/react";

interface Props extends ReactChange<HTMLInputElement> {
    label: string
    type: string
    name: string
    value: string
    required?: boolean
    disabled?: boolean,
    autoFocus?: boolean,
    error: string | null
}

const Input: FC<Props> = (props) => {
    return (
        <Label>
            <LabelTitle>{props.label}</LabelTitle>
            <InputStyled placeholder={props.label} {...props} />
            {props.error && <Error>{props.error}</Error>}
        </Label>
    )
}

export default Input