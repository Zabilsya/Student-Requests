import React from 'react';
import {Container} from "../../layouts/PrivateLayout/styles";
import {HeaderWrapper, HeaderСontent, Logo, SecondWrapper} from './styles'
import {IoNotificationsOutline} from "react-icons/io5";
import ProfileHeader from "../ProfileHeader";

const Header = () => {
    return (
        <HeaderWrapper>
            <Container>
                <HeaderСontent>
                    <Logo src="/images/hselogo.svg" alt="HSE logo" />
                    <SecondWrapper>
                        <IoNotificationsOutline style={{cursor: "pointer"}} size="24px" />
                        <ProfileHeader />
                    </SecondWrapper>
                </HeaderСontent>
            </Container>
        </HeaderWrapper>
    );
};

export default Header;