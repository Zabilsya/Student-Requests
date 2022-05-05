import React, {FC} from 'react';
import {DocumentDeleteButton, DocumentStyled} from "./styles";
import {IoDocumentAttachOutline, IoCloseCircle} from "react-icons/io5";
import {blue, red, white} from "../../../const/styles";
import {IFile} from "../../../types/file";

interface Props extends IFile {
    fullWidth?: boolean
    onDelete?: (fileName: string) => void
}

const Document: FC<Props> = ({file_name: fileName, file_path: filePath, fullWidth, onDelete}) => {
    return (
        <DocumentStyled fullWidth={fullWidth} href={filePath} download>
            <IoDocumentAttachOutline className="doc__image" size="20px" color={blue} />
            {fileName}
            {onDelete &&
                <DocumentDeleteButton onClick={(event) => {event.preventDefault(); onDelete(fileName)}}>
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