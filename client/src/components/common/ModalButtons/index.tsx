import React, {FC} from 'react';
import Button from "../../UI/Button";
import {ModalMode} from "../../../const";
import {ButtonsWrapper} from "./styles";

interface Props {
    mode: ModalMode
    onClose: () => void
}

const ModalButtons: FC<Props> = ({mode, onClose}) => {
    return (
        <ButtonsWrapper>
            <Button variant="outline" type="button" onClick={onClose}>Отменить</Button>
            <Button type="submit">
                {mode === ModalMode.Create ? "Создать" : "Сохранить"}
            </Button>
        </ButtonsWrapper>
    );
};

export default ModalButtons