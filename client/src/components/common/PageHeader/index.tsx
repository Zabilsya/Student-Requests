import React, {FC, ReactNode} from 'react';
import {Title} from "../../styled/title"
import {PageHeaderStyled} from "./styles";
import {MarginWrapper} from "../../styled/wrappers";

interface Props {
    type?: 'separated' | 'combined'
    title: string
    children?: ReactNode
}

const PageHeader: FC<Props> = ({type, title, children}) => {
    return (
        <PageHeaderStyled type={type}>
            <Title>{title}</Title>
            {children}
        </PageHeaderStyled>
    );
};

export default PageHeader