import React, {FC, ReactNode} from 'react';
import {Title} from "../../styled/title"
import {PageHeaderStyled} from "./styles";

interface Props {
    title: string
    children?: ReactNode
}

const PageHeader: FC<Props> = ({title, children}) => {
    return (
        <PageHeaderStyled>
            <Title>{title}</Title>
            {children}
        </PageHeaderStyled>
    );
};

export default PageHeader