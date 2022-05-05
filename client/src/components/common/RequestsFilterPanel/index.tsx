import React, {FC, useEffect, useMemo} from 'react';
import {IOption} from "../../../types/select";
import {FilterPanelWrapper} from "../../styled/wrappers";
import CustomSelect from "../../UI/Select";
import {defaultRequestTemplateForFilter, requestStatusesForFilter, userTypesForFilter} from "../../../const";
import {requestTemplatesAPI} from "../../../services/RequestTemplatesService";
import {getDataForSelect} from "../../../utils";

interface Props {
    onChangeStatus: (status: number) => void
    onChangeTemplate: (template: number) => void
}

const RequestsFilterPanel: FC<Props> = ({onChangeStatus, onChangeTemplate}) => {
    const { data: templates, isSuccess } = requestTemplatesAPI.useGetTemplatesForUserQuery()

    const changeStatus = (option: IOption | null) => {
        if (option) {
            onChangeStatus(option?.value)
        }
    }

    const changeTemplate = (option: IOption | null) => {
        if (option) {
            onChangeTemplate(option?.value)
        }
    }

    const templateOptions = useMemo(() => {
        if (templates) {
            return getDataForSelect(templates, 'id', ['name', 'surname', 'patronymic'])
        }
        return []
    }, [isSuccess])

    return (
        <FilterPanelWrapper>
            <CustomSelect
                label="Статус обращения:"
                defaultValue={requestStatusesForFilter[0]}
                options={requestStatusesForFilter}
                onChange={changeStatus}
                isSearchable={false}
            />
            {isSuccess &&
                <CustomSelect
                    label="Тип обращения:"
                    defaultValue={defaultRequestTemplateForFilter}
                    options={[defaultRequestTemplateForFilter, ...templateOptions]}
                    onChange={changeTemplate}
                    isSearchable={false}
                />
            }
        </FilterPanelWrapper>
    );
};

export default RequestsFilterPanel