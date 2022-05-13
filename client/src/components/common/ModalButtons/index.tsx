import React, {FC} from 'react';
import Button from "../../UI/Button";
import {ModalMode} from "../../../const";
import {ButtonsWrapper} from "./styles";

interface Props {
    initialData?: any
    onClose: () => void
}

const ModalButtons: FC<Props> = ({initialData, onClose}) => {
    return (
        <ButtonsWrapper>
            <Button variant="outline" type="button" onClick={onClose}>Отменить</Button>
            <Button type="submit">
                {initialData ? "Сохранить" : "Создать"}
            </Button>
        </ButtonsWrapper>
    );
};

export default ModalButtons