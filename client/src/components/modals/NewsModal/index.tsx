import React, {ChangeEvent, FC, FormEvent, useEffect, useMemo, useState} from 'react';
import {IGroup} from "../../../store/reducers/Users/Models";
import {IChangeNews, INews} from "../../../store/reducers/News/Interfaces";
import {IOption} from "../../../types/select";
import {getDataForSelect} from "../../../utils";
import {MarginWrapper} from "../../styled/wrappers";
import Input from "../../UI/Input";
import CustomSelect from "../../UI/Select";
import ModalButtons from "../../common/ModalButtons";
import TextArea from "../../UI/TextArea";
import InputFiles from "../../UI/InputFiles";
import {ImageListType, ImageType} from "react-images-uploading";
import ImageUploader from "../../UI/ImageUploader";
import {IFile} from "../../../types/file";

interface Props {
    initialData?: INews
    groups: IGroup[]
    onClose: () => void
    onSubmit: (data: IChangeNews) => void
}

const NewsModal: FC<Props> = ({initialData, groups, onClose, onSubmit}) => {
    const [form, setForm] = useState<IChangeNews>({
        id: 0,
        title: '',
        text: '',
        groups: [] as IOption[],
        image: null as ImageType | null,
        files: [] as File[],
        isGroupsChange: false,
        filesFromServer: [] as IFile[],
        deletedFiles: [] as IFile[]
    })

    useEffect(() => {
        if (initialData) {
            setForm({
                ...form,
                id: initialData.id,
                title: initialData.title,
                text: initialData.text,
                image: initialData.image ? {url: (process.env.REACT_APP_API_URL + '\\' + initialData.image).replace(/\\/g, '/')} : null,
                filesFromServer: initialData.files,
                groups: getDataForSelect(initialData.groups, 'id', 'name')
            })
        }
    }, [initialData])

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

    const onChange = (options: readonly IOption[] | null) => {
        if (options) {
            setForm({...form, isGroupsChange: true, groups: options as IOption[]})
        }
    }

    const changeText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const changeImage = ([image]: ImageListType) => {
        if (image && image['url']) {
            setForm({...form, image: {url: image['url'], file: image.file}});
        } else {
            setForm({...form, image: null});
        }
    };

    const changeNews = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(form)
    }

    const options = useMemo(() => {
        return getDataForSelect(groups, 'id', 'name')
    }, [groups])

    return (
        <form onSubmit={changeNews}>
            <CustomSelect
                label="Группы"
                defaultValue={initialData && getDataForSelect(initialData.groups, 'id', 'name')}
                options={options}
                fullWidth
                onChange={onChange}
                isSearchable={true}
                placeholder="Выберите группу студентов"
                isMulti
            />
            <MarginWrapper top="20px" bottom="20px">
                <Input
                    name="title"
                    type="text"
                    label="Заголовок"
                    value={form.title}
                    onChange={changeText}
                    error={null}
                    required
                />
            </MarginWrapper>
            <TextArea
                name="text"
                label="Текст"
                value={form.text}
                onChange={changeText}
                error={null}
                required
            />

            <MarginWrapper top="20px" bottom="20px">
                <ImageUploader value={form.image ? [form.image] : []} onChange={changeImage} />
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

export default NewsModal