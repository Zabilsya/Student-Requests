import React, {FC, FormEvent, useEffect, useMemo, useState} from 'react';
import {ModalMode} from "../../../const";
import {IUser} from "../../../store/reducers/Users/Models";
import Input from "../../UI/Input";
import CustomSelect from "../../UI/Select";
import {getDataForSelect} from "../../../utils";
import {MarginWrapper} from "../../styled/wrappers";
import ModalButtons from "../../common/ModalButtons";
import {IOption} from "../../../types/select";
import {ICreateTemplate} from "../../../store/reducers/RequestTemplates/Models";

interface Props {
    mode: ModalMode
    workers: IUser[]
    onClose: () => void
    onSubmit: (data: ICreateTemplate) => void
}

const RequestTemplatesModal: FC<Props> = ({mode, workers, onSubmit, onClose}) => {
    const [form, setForm] = useState({
        name: '',
        user_id: 1,
        is_offline: false
    })

    const onChange = (option: IOption | null) => {
        if (option?.value) {
            setForm({...form, user_id: option.value})
        }
    }

    const createTemplate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(form)
    }

    const options = useMemo(() => {
        return getDataForSelect(workers, 'id', ['name', 'surname', 'patronymic'])
    }, [workers])

    useEffect(() => {
        setForm({...form, user_id: options[0].value})
    }, [options])

    return (
        <form onSubmit={createTemplate}>
            <MarginWrapper bottom="20px">
                <Input
                    name="name"
                    type="text"
                    label="Название"
                    value={form.name}
                    onChange={(event) => setForm({...form, name: event.target.value})}
                    error={null}
                    required
                    autoFocus
                />
            </MarginWrapper>
            <CustomSelect
                label="Ответственный"
                defaultValue={options[0]}
                options={options}
                fullWidth
                onChange={onChange}
                isSearchable={true}
            />
            <MarginWrapper top="50px">
                <ModalButtons mode={mode} onClose={onClose} />
            </MarginWrapper>
        </form>
    );
};

export default RequestTemplatesModal