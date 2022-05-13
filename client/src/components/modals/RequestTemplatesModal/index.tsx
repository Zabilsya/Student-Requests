import React, {FC, FormEvent, useEffect, useMemo, useState} from 'react';
import {ModalMode} from "../../../const";
import {IUser} from "../../../store/reducers/Users/Models";
import Input from "../../UI/Input";
import CustomSelect from "../../UI/Select";
import {getDataForSelect} from "../../../utils";
import {MarginWrapper} from "../../styled/wrappers";
import ModalButtons from "../../common/ModalButtons";
import {IOption} from "../../../types/select";
import {IChangeTemplate, IRequestTemplate} from "../../../store/reducers/RequestTemplates/Models";

interface Props {
    initialData: IRequestTemplate | null
    workers: IUser[]
    onClose: () => void
    onSubmit: (data: IChangeTemplate, type: ModalMode) => void
}

const RequestTemplatesModal: FC<Props> = ({initialData, workers, onSubmit, onClose}) => {
    const [form, setForm] = useState<IChangeTemplate>({
        id: 0,
        name: '',
        user_id: 1,
        is_offline: false
    })

    useEffect(() => {
        if (initialData) {
            setForm({
                id: initialData.id,
                name: initialData.name,
                user_id: initialData.user.id,
                is_offline: initialData.is_offline
            })
        }
    }, [initialData])

    const onChange = (option: IOption | null) => {
        if (option?.value) {
            setForm({...form, user_id: option.value})
        }
    }

    const changeTemplate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (initialData) {
            onSubmit(form, ModalMode.Update)
        } else {
            delete form.id
            onSubmit(form, ModalMode.Create)
        }
    }

    const options = useMemo(() => {
        return getDataForSelect(workers, 'id', ['name', 'surname', 'patronymic'])
    }, [workers])

    useEffect(() => {
        if (!initialData) {
            setForm({...form, user_id: options[0].value})
        }
    }, [options])


    return (
        <form onSubmit={changeTemplate}>
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
                defaultValue={
                    initialData
                    ? getDataForSelect([initialData.user], 'id', ['name', 'surname', 'patronymic'])
                    : options[0]}
                options={options}
                fullWidth
                onChange={onChange}
                isSearchable={true}
            />
            <MarginWrapper top="50px">
                <ModalButtons initialData={initialData} onClose={onClose} />
            </MarginWrapper>
        </form>
    );
};

export default RequestTemplatesModal