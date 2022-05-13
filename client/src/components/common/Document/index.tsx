import React, {FC, MouseEvent} from 'react';
import {DocumentDeleteButton, DocumentStyled} from "./styles";
import {IoDocumentAttachOutline, IoCloseCircle} from "react-icons/io5";
import {blue, red, white} from "../../../const/styles";
import {IFile} from "../../../types/file";
import { saveAs } from "file-saver";

interface Props extends IFile {
    fullWidth?: boolean
    onDelete?: (file: IFile) => void
}

const Document: FC<Props> = ({id, file_name: fileName, file_path: filePath, fullWidth, onDelete}) => {
    const deleteDocument = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onDelete && onDelete({id, file_name: fileName, file_path: filePath})
    }

    return (
        <DocumentStyled fullWidth={fullWidth} onClick={() => saveAs(filePath, fileName)}>
            <IoDocumentAttachOutline className="doc__image" size="20px" color={blue} />
            {fileName}
            {onDelete &&
                <DocumentDeleteButton onClick={deleteDocument}>
                    <IoCloseCircle
                        size="28px"
                        color={red}
                        stroke={white}
                        strokeWidth="30px"
                    />
                </DocumentDeleteButton>
            }
        </DocumentStyled>
    );
};

export default Document