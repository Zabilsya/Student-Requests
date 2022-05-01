import React, {FC, useEffect} from 'react';
import {Delimiter, DropDownButton, DropDownContainer, DropDownItem, DropDownItemLink, DropDownList} from "./styles";
import {RoutesList} from "../../../const";
import {IoChevronDownOutline, IoChevronUpOutline} from "react-icons/io5";

interface Props {
    active: boolean
}

const DropDownProfile: FC<Props> = ({active}) => {
    return (
        <DropDownContainer>
            <DropDownButton>
                {active ? <IoChevronUpOutline size="14px" /> : <IoChevronDownOutline size="14px" />}
            </DropDownButton>

            <DropDownList active={active} onClick={event => event.stopPropagation()}>
                <DropDownItem>
                    <DropDownItemLink to={RoutesList.Profile}>Мой профиль</DropDownItemLink>
                </DropDownItem>
                <Delimiter />
                <DropDownItem color="red">Выйти</DropDownItem>
            </DropDownList>
        </DropDownContainer>
    );
};

export default DropDownProfile;