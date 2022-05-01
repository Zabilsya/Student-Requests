import styled from "@emotion/styled";
import {black, blue, defaultBlockStyles, flexColumn, lightGray, transition} from "../../../const/styles";
import {NavLink} from "react-router-dom";
import {css} from "@emotion/react";

const menuItem = css`
    display: flex;
    font-size: 16px;
    color: ${black};
    ${transition};
    cursor: pointer;
    svg {
        ${transition};
    }
    :hover {
        color: ${blue};
        
        svg {
           color: ${blue} !important;
        }
    }
`

export const MenuList = styled.aside`
    ${flexColumn};
    gap: 15px;
    flex-basis: 24%;
    width: 100%;
    padding: 20px 0 20px 20px;
    ${defaultBlockStyles};
    .active {
        color: ${blue};
       
        svg {
          color: ${blue} !important;
        }
    }
`

export const MenuItem = styled(NavLink)`
    align-items: center;
    ${menuItem};
    gap: 15px;
`

interface MenuSubListProps {
    active: boolean
}

export const MenuItemWithChildren = styled.div<MenuSubListProps>`
    color: ${({active}) => active && blue} !important;
    justify-content: center;
    flex-direction: column;
    ${menuItem};
    
    svg {
        color: ${({active}) => active && blue} !important;
    }
`

export const MenuSubItemList = styled.div<MenuSubListProps>`
    height: ${({active}) => active ? '62px': '0'};
    overflow: hidden;
    ${transition};
    ${flexColumn};
    gap: 15px;
`

export const MenuSubItem = styled(NavLink)`
    font-size: 14px;
    padding-left: 40px;
    color: ${lightGray};
    ${transition};
    
    :hover {
        color: ${blue};
    }
    
    :first-of-type {
        padding-top: 15px;
    }
`