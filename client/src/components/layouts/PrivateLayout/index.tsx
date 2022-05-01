import React, {FC, ReactNode} from 'react';
import {
    Container,
    PrivateLayoutStyled,
    Content, MainContainer
} from './styles';
import Menu from "../../common/Menu";
import Header from "../../common/Header";
import PageHeader from "../../common/PageHeader";

interface Props {
    children: ReactNode
}

const PrivateLayout: FC<Props> = ({children}) => {
    return (
        <PrivateLayoutStyled>
            <Header />
            <Container>
                <MainContainer>
                    <Menu />
                    <Content>
                        <PageHeader title="Список пользователей"/>
                        {children}
                    </Content>
                </MainContainer>
            </Container>
        </PrivateLayoutStyled>
    );
};

export default PrivateLayout