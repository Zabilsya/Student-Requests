import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {ModalMode} from "../../../const";
import InputFiles from "../../UI/InputFiles";
import {IChangeSchedule, ISchedule} from "../../../store/reducers/Schedule/Models";
import {IFile} from "../../../types/file";
import {MarginWrapper} from "../../styled/wrappers";
import Input from "../../UI/Input";
import ModalButtons from "../../common/ModalButtons";

interface Props {
    initialData: ISchedule | null
    onSubmit: (schedule: IChangeSchedule, type: ModalMode) => void
    onClose: () => void
}

const ScheduleModal: FC<Props> = ({initialData, onSubmit, onClose}) => {
    const [form, setForm] = useState<IChangeSchedule>({
        id: 0,
        title: '',
        filesFromServer: [] as IFile[],
        files: [] as File[],
        deletedFiles: [] as IFile[]
    })

    useEffect(() => {
        if (initialData) {
            setForm({
                ...form,
                id: initialData.id,
                title: initialData.title,
                filesFromServer: initialData.files,
            })
        }
    }, [initialData])


    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => setForm({...form, title: event.target.value})

    const changeFiles = (files: File[]) => {
        setForm({...form, files})
    }

    const deleteFilesFromServer = (fileData: IFile) => {
        setForm({
            ...form,
            filesFromServer: form.filesFromServer.filter(file => file.id !== fileData.id),
            deletedFiles: [...form.deletedFiles, fileData]
        })
    }

    const changeSchedule = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.preventDefault()
        if (initialData) {
            onSubmit(form, ModalMode.Update)
        } else {
            onSubmit(form, ModalMode.Create)
        }
    }

    return (
        <form onSubmit={changeSchedule}>
            <MarginWrapper bottom="20px">
                <Input
                    name="title"
                    type="text"
                    label="Заголовок"
                    value={form.title}
                    onChange={changeTitle}
                    error={null}
                    required
                />
            </MarginWrapper>

            <InputFiles
                files={form.files}
                filesFromServer={form.filesFromServer}
                onChangeFiles={changeFiles}
                onChangeFilesFromServer={deleteFilesFromServer}
            />

            <MarginWrapper top="50px">
                <ModalButtons initialData={initialData} onClose={onClose} />
            </MarginWrapper>
        </form>
    );
};

export default ScheduleModal