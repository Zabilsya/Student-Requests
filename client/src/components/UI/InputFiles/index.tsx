import React, {FC, useEffect, useRef, useState} from 'react';
import {FileListWrapper, FilesLoaderWrapperExtra, InputFileText, InputFileTitle} from "./styles";
import {FilesLoaderWrapper, FlexWrapper, MarginWrapper} from "../../styled/wrappers";
import {IoAddCircleOutline, IoAttachOutline} from "react-icons/io5";
import Document from "../../common/Document";
import {blue} from "../../../const/styles";
import {IFile} from "../../../types/file";

interface Props {
    files: File[]
    onChangeFiles: (files: File[]) => void
    filesFromServer?: IFile[]
    onChangeFilesFromServer?: (file: IFile) => void
}

const InputFiles: FC<Props> = ({files, filesFromServer, onChangeFiles, onChangeFilesFromServer}) => {
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const addFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addedFiles = event.target.files || []
        let resultFiles: File[] = []
        for (let i = 0; i < addedFiles.length; i++) {
            resultFiles.push(addedFiles[i])
        }
        onChangeFiles([...files as File[], ...resultFiles] as File[])
    }

    const deleteFile = (fileData: IFile) => {
        onChangeFiles(files.filter((file, index) => index !== fileData.id))
    }

    const deleteFileFromServer = (file: IFile) => {
        onChangeFilesFromServer && onChangeFilesFromServer({
            ...file,
            file_path: file.file_path.replace(`${process.env.REACT_APP_API_URL}/`, '')
        })
    }

    const isRenderFiles = () => {
        return (filesFromServer && filesFromServer.length > 0) || files.length > 0
    }

    return (
        <>
            {isRenderFiles() &&
                <>
                    <MarginWrapper bottom="10px">
                        <InputFileTitle>Прикрепленные файлы:</InputFileTitle>
                    </MarginWrapper>

                    <FileListWrapper>
                        {filesFromServer && filesFromServer.map((file, index) => (
                            <Document
                                id={file.id}
                                file_path={process.env.REACT_APP_API_URL + '/' + file.file_path}
                                file_name={file.file_name}
                                onDelete={deleteFileFromServer}
                                key={file.file_path}
                            />
                        ))}

                        {files.map((file, index) => (
                            <Document
                                id={index}
                                file_path={URL.createObjectURL(file)}
                                file_name={file.name}
                                onDelete={deleteFile}
                                key={URL.createObjectURL(file)}
                            />
                        ))}

                        <FilesLoaderWrapperExtra type="button" onClick={() => inputRef.current.click()}>
                            <IoAddCircleOutline size="24px" color={blue} />
                        </FilesLoaderWrapperExtra>

                    </FileListWrapper>
                </>
            }

            {files.length === 0 && !filesFromServer || (files.length === 0 && filesFromServer && filesFromServer.length === 0) &&
                <FilesLoaderWrapper type="button" onClick={() => inputRef.current.click()}>
                    <FlexWrapper gap="10px">
                        <IoAttachOutline size="24px" />
                        <InputFileText>Прикрепить документы</InputFileText>
                    </FlexWrapper>
                </FilesLoaderWrapper>
            }

            <input
                ref={inputRef}
                type="file"
                name="docs"
                onChange={addFiles}
                hidden
                multiple
            />
        </>
    );
};

export default InputFiles