import React, {FC, MouseEvent} from 'react';
import {EditDeleteBlockStyled, EditButton, DeleteButton} from "./styles";
import {IoCreateOutline, IoTrashOutline} from "react-icons/io5";
import {white} from "../../../const/styles";

interface Props {
    onEdit: () => void
    onDelete: () => void
    inTable?: boolean
}

const EditDeleteBLock: FC<Props> = ({onEdit, onDelete, inTable}) => {
    return (
        <EditDeleteBlockStyled inTable={inTable}>
            <EditButton onClick={onEdit}>
                <IoCreateOutline size="16px" color={white} />
            </EditButton>
            <DeleteButton onClick={onDelete}>
                <IoTrashOutline size="16px" color={white} />
            </DeleteButton>
        </EditDeleteBlockStyled>
    );
};

export default EditDeleteBLock