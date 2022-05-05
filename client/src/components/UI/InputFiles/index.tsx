import React, {FC, useRef, useState} from 'react';
import {FileListWrapper, FilesLoaderWrapper, FilesLoaderWrapperExtra, InputFileText, InputFileTitle} from "./styles";
import {FlexWrapper, MarginWrapper} from "../../styled/wrappers";
import {IoAddCircleOutline, IoAttachOutline} from "react-icons/io5";
import Document from "../../common/Document";
import {blue} from "../../../const/styles";

interface Props {
    files: File[]
    onChangeFiles: (files: File[]) => void
}

const InputFiles: FC<Props> = ({files, onChangeFiles}) => {
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const addFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addedFiles = event.target.files || []
        let resultFiles: File[] = []
        for (let i = 0; i < addedFiles.length; i++) {
            resultFiles.push(addedFiles[i])
        }
        onChangeFiles([...files as File[], ...resultFiles] as File[])
    }

    const deleteFile = (fileName: string) => {
        onChangeFiles(files.filter(file => file.name !== fileName))
    }

    return (
        <>
            {files.length > 0 &&
                <MarginWrapper bottom="10px">
                    <InputFileTitle>Прикрепленные файлы:</InputFileTitle>
                </MarginWrapper>
            }
            <FileListWrapper>
                {files.map((file, index) => (
                    <Document
                        file_path={URL.createObjectURL(file)}
                        file_name={file.name}
                        onDelete={deleteFile}
                        key={file.size + index}
                    />
                ))}

                {files.length > 0 &&
                    <FilesLoaderWrapperExtra type="button" onClick={() => inputRef.current.click()}>
                        <IoAddCircleOutline size="24px" color={blue} />
                    </FilesLoaderWrapperExtra>
                }
            </FileListWrapper>

            {files.length === 0 &&
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