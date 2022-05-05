import Select, {GroupBase, Props} from 'react-select';
import React from "react";
import {Label, SelectWrapper} from "./styles";

declare module 'react-select/dist/declarations/src/Select' {
    export interface Props<
        Option,
        IsMulti extends boolean,
        Group extends GroupBase<Option>
        > {
        label: string
        fullWidth?: boolean
    }
}

function CustomSelect<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
    >(props: Props<Option, IsMulti, Group>) {
    const { label, fullWidth } = props

    return (
        <SelectWrapper fullWidth={fullWidth}>
            <Label fullWidth={fullWidth}>{label}</Label>
            <Select
                className={`custom-select ${fullWidth ? "select-full" : ""}`}
                classNamePrefix="custom-select"
                {...props}
            />
        </SelectWrapper>
    );
}

export default CustomSelect