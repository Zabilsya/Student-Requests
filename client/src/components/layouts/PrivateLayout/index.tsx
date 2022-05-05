import React, {FC, ReactNode} from 'react';
import {
    Container,
    PrivateLayoutStyled,
    MainContainer,
    ContentWrapper
} from './styles';
import Menu from "../../common/Menu";
import Header from "../../common/Header";

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
                    <ContentWrapper>
                        {children}
                    </ContentWrapper>
                </MainContainer>
            </Container>
        </PrivateLayoutStyled>
    );
};

export default PrivateLayout