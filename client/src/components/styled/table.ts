import styled from "@emotion/styled";
import {blue, defaultBlockStyles, white} from "../../const/styles";

export const Table = styled.table`
    display: block;
    width: 100%;
    ${defaultBlockStyles};
    text-align: left;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

export const TableHeader = styled.thead`
    display: block;
    width: 100%;
    background: ${blue};
    font-weight: 500;
    color: ${white};
    padding: 16px 15px 18px 15px;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
`

export const TableRowHead = styled.tr`
    display: flex;
    width: 100%;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
`

export const TableBody = styled.tbody`
    display: block;
    width: 100%;
    background: ${white};
    font-weight: 400;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
`

export const TableRowBody = styled.tr`
    display: flex;
    width: 100%;
    padding: 25px 15px;
    border-bottom: 1px solid #F5F5F5;
    
    :last-of-type {
        border-bottom: none;
        border-bottom-right-radius: inherit;
        border-bottom-left-radius: inherit;
    }
`

interface TableCellProps {
    width: string
}

export const TableCell = styled.td<TableCellProps>`
    width: ${({width}) => width};
`