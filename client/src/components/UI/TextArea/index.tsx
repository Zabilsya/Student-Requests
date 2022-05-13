import React, {FC} from "react";
import {Label, LabelTitle, Error, TextAreaStyled} from "./styles";
import {ReactChange} from "../../../types/react";

interface Props extends ReactChange<HTMLTextAreaElement> {
    label: string
    name: string
    value: string
    required?: boolean
    error: string | null
}

const TextArea: FC<Props> = (props) => {
    const { label, name, value, onChange, error } = props

    return (
        <Label>
            <LabelTitle>{label}</LabelTitle>
            <TextAreaStyled
                placeholder={label}
                name={name}
                value={value}
                onChange={onChange}
                error={error}
            />
            {error && <Error>{error}</Error>}
        </Label>
    )
}

export default TextArea