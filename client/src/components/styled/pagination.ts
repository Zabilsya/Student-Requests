import styled from "@emotion/styled";
import ReactPaginate from "react-paginate";
import {blue, defaultBlockStyles, flexFullCenter, lightGray, transition, white} from "../../const/styles";

export const PaginationStyled = styled(ReactPaginate)`
    display: flex;
    align-items: center;
    gap: 5px;
    width: fit-content;
    ${defaultBlockStyles};
    list-style-type: none;
    padding: 10px;
    margin-top: 30px;
    
    li {
        ${flexFullCenter};
        border-radius: 10px;
        cursor: pointer;
      
        ${transition};
        
        :hover {
            background: ${blue} !important;
            color: ${white};
        }
        
        a {
            width: 100%;
            padding: 8px 11px;
        }
    }
    
    li.selected {
        background: ${blue};
        color: ${white};
    }
    
    li.next,
    li.previous {
         background: #F5F5F5;
    }
`