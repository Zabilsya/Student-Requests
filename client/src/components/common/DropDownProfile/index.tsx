import React, {FC, useEffect} from 'react';
import {Delimiter, DropDownButton, DropDownContainer, DropDownItem, DropDownItemLink, DropDownList} from "./styles";
import {RoutesList} from "../../../const";
import {IoChevronDownOutline, IoChevronUpOutline} from "react-icons/io5";
import browserHistory from "../../../routes/history";
import {red} from "../../../const/styles";

interface Props {
    active: boolean
}

const DropDownProfile: FC<Props> = ({active}) => {

    const logout = () => {
        localStorage.removeItem('jwtToken')
        window.location.reload()
    }

    return (
        <DropDownContainer>
            <DropDownButton>
                {active ? <IoChevronUpOutline size="14px" /> : <IoChevronDownOutline size="14px" />}
            </DropDownButton>

            <DropDownList active={active}>
                <DropDownItem>
                    <DropDownItemLink to={RoutesList.Profile}>Мой профиль</DropDownItemLink>
                </DropDownItem>
                <Delimiter />
                <DropDownItem color={red} onClick={logout}>Выйти</DropDownItem>
            </DropDownList>
        </DropDownContainer>
    );
};

export default DropDownProfile;