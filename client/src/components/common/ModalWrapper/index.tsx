import React, {FC, ReactNode} from 'react';
import {ModalContent, ModalOverlay} from "./styles";
import {Title} from "../../styled/title"
import {MarginWrapper} from "../../styled/wrappers";

interface Props {
    title: string
    onClose: () => void
    children: ReactNode
}

const ModalWrapper: FC<Props> = ({title, children, onClose}) => {
    const handleOutsideClick = () => onClose()

    return (
        <ModalOverlay onClick={handleOutsideClick}>
            <ModalContent onClick={event => event.stopPropagation()}>
                <MarginWrapper bottom="30px">
                    <Title color="blue">{title}</Title>
                </MarginWrapper>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
};

export default ModalWrapper