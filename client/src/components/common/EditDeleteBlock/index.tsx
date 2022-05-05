import React, {FC, MouseEvent} from 'react';
import {EditDeleteBlockStyled, EditButton, DeleteButton} from "./styles";
import {IoCreateOutline, IoTrashOutline} from "react-icons/io5";
import {white} from "../../../const/styles";

interface Props {
    onEdit: (event: MouseEvent) => void
    onDelete: (event: MouseEvent) => void
}

const EditDeleteBLock: FC<Props> = ({onEdit, onDelete}) => {
    return (
        <EditDeleteBlockStyled>
            <EditButton onClick={onEdit}>
                <IoCreateOutline size="14px" color={white} />
            </EditButton>
            <DeleteButton onClick={onDelete}>
                <IoTrashOutline size="14px" color={white} />
            </DeleteButton>
        </EditDeleteBlockStyled>
    );
};

export default EditDeleteBLock