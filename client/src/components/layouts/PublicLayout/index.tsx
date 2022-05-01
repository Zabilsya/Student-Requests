import React, {FC, ReactNode} from 'react';
import {PublicLayoutStyled} from "./styles";

interface Props {
    children: ReactNode
}

const PublicLayout: FC<Props> = ({children}) => {
    return (
        <PublicLayoutStyled>
            {children}
        </PublicLayoutStyled>
    );
};

export default PublicLayout