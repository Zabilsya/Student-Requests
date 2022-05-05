import React, {FC} from 'react';
import CustomSelect from "../../UI/Select";
import {userTypesForFilter} from "../../../const";
import {IOption} from "../../../types/select";
import {FilterPanelWrapper} from "../../styled/wrappers";

interface Props {
    onChangeFilter: (userType: number) => void
}

const UsersFilterPanel: FC<Props> = ({onChangeFilter}) => {
    const onChange = (option: IOption | null) => {
        if (option?.value) {
            onChangeFilter(option.value)
        }
    }

    return (
        <FilterPanelWrapper>
            <CustomSelect
                label="Тип пользователя:"
                defaultValue={userTypesForFilter[1]}
                options={userTypesForFilter}
                onChange={onChange}
                isSearchable={false}
            />
        </FilterPanelWrapper>
    );
};

export default UsersFilterPanel