import styled from "@emotion/styled";
import {flexColumn, red, transition, white} from "../../../const/styles";
import {Link} from "react-router-dom";

export const DropDownContainer = styled.div`
    position: relative;
`

interface DropDownListProps {
    active: boolean
}

export const DropDownList = styled.div<DropDownListProps>`
    visibility: ${({active}) => active ? 'visible': 'hidden'};
    opacity: ${({active}) => active ? '1': '0'};
    width: 160px;
    position: absolute;
    bottom: -10px;
    right: 0;
    transform: translateY(100%);
    border-radius: 10px;
    background: ${white};
    ${flexColumn};
    padding: 15px 0;
    ${transition};
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
`

interface DropDownItemProps {
    color?: 'gray' | 'red';
}

export const DropDownItem = styled.div<DropDownItemProps>`
    color: ${({color}) => color === 'red' ? red : '#959DA7'};
    padding: 0 15px;
`

export const DropDownItemLink = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
    color: #959DA7;
`

export const Delimiter = styled.hr`
    width: 100%;
    height: 1px;
    background: #F5F5F5;
    margin: 10px 0;
    border: none;
`

export const DropDownButton = styled.button`
    border: none;
    background: none;
`