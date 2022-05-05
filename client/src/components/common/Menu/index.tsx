import React, {useState} from 'react';
import {MenuList, MenuItem, MenuItemWithChildren, MenuSubItemList, MenuSubItem} from "./styles";
import {RoutesList} from "../../../const";
import {IoChevronDownOutline, IoChevronUpOutline, IoNewspaperOutline} from "react-icons/io5";
import {lightGray} from "../../../const/styles";
import {FlexWrapper} from "../../styled/wrappers";
import {DropDownButton} from "../DropDownProfile/styles";
import {useLocation} from "react-router-dom";

const Menu = () => {
    const [isActiveSubMenuItem, setIsActiveSubMenuItem] = useState({
        office: false,
        worksAndCourses: false
    })

    const location = useLocation()

    return (
        <MenuList>
            <MenuItem to={RoutesList.News}>
                <IoNewspaperOutline size="25px" color={lightGray} />
                Лента новостей
            </MenuItem>

            <MenuItem to={RoutesList.Requests}>
                <IoNewspaperOutline size="25px" color={lightGray} />
                Мои запросы
            </MenuItem>

            <MenuItem to={RoutesList.RequestTemplates}>
                <IoNewspaperOutline size="25px" color={lightGray} />
                Управление запросами
            </MenuItem>

            <MenuItem to={RoutesList.Users}>
                <IoNewspaperOutline size="25px" color={lightGray} />
                Пользователи
            </MenuItem>

            <MenuItem to={RoutesList.Schedule}>
                <IoNewspaperOutline size="25px" color={lightGray} />
                Расписание занятий
            </MenuItem>

            <MenuItemWithChildren
                active={location.pathname === RoutesList.Staff || location.pathname === RoutesList.Contacts}
                onClick={() => setIsActiveSubMenuItem({...isActiveSubMenuItem, office: !isActiveSubMenuItem.office})}
            >
                <FlexWrapper gap="15px">
                    <IoNewspaperOutline size="25px" color={lightGray} />
                    Учебный офис
                    <DropDownButton>
                        {isActiveSubMenuItem.office ? <IoChevronUpOutline size="14px" /> : <IoChevronDownOutline size="14px" />}
                    </DropDownButton>
                </FlexWrapper>
                <MenuSubItemList active={isActiveSubMenuItem.office} onClick={event => event.stopPropagation()}>
                    <MenuSubItem to={RoutesList.Staff}>Штаб</MenuSubItem>
                    <MenuSubItem to={RoutesList.Contacts}>Контакты</MenuSubItem>
                </MenuSubItemList>
            </MenuItemWithChildren>

            <MenuItem to={RoutesList.FAQ}>
                <IoNewspaperOutline size="25px" color={lightGray} />
                Часто задаваемые вопросы
            </MenuItem>

        </MenuList>
    );
};

export default Menu