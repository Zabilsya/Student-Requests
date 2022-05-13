import React, {FC, FormEvent, useEffect, useMemo, useState} from 'react';
import {MarginWrapper} from "../../styled/wrappers";
import CustomSelect from "../../UI/Select";
import ModalButtons from "../../common/ModalButtons";
import {IRequestTemplate} from "../../../store/reducers/RequestTemplates/Models";
import {getDataForSelect} from "../../../utils";
import {IOption} from "../../../types/select";
import {ICreateRequest} from "../../../store/reducers/Requests/Interfaces";
import InputFiles from "../../UI/InputFiles";

interface Props {
    templates: IRequestTemplate[]
    onClose: () => void
    onSubmit: (data: ICreateRequest) => void
}

const RequestsModal: FC<Props> = ({templates, onSubmit, onClose}) => {
    const [form, setForm] = useState({
        template_id: 1,
        files: [] as File[]
    })

    const changeTemplate = (option: IOption | null) => {
        if (option?.value) {
            setForm({...form, template_id: option.value})
        }
    }

    const changeFiles = (files: File[]) => {
        setForm({...form, files})
    }

    const createRequest = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(form)
    }

    const templateOptions = useMemo(() => {
        return getDataForSelect(templates, 'id', 'name')
    }, [templates])

    useEffect(() => {
        setForm({...form, template_id: templateOptions[0].value})
    }, [templateOptions])

    return (
        <form onSubmit={createRequest}>
            <MarginWrapper bottom="20px">
                <CustomSelect
                    label="Тип обращения"
                    defaultValue={templateOptions[0]}
                    options={templateOptions}
                    fullWidth
                    onChange={changeTemplate}
                    isSearchable={true}
                />
            </MarginWrapper>
            <InputFiles
                files={form.files}
                onChangeFiles={changeFiles}
            />
            <MarginWrapper top="50px">
                <ModalButtons onClose={onClose} />
            </MarginWrapper>
        </form>
    );
};

export default RequestsModal