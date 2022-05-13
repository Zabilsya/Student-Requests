import styled from "@emotion/styled";
import {black, blue, flexFullCenter, lightBlue, lightGray, transition, white} from "../../../const/styles";

export const FilesLoaderWrapperExtra = styled.button`
    ${flexFullCenter};
    width: 40px;
    height: 40px;
    border: none;
    background: ${lightBlue};
    border-radius: 10px;
    cursor: pointer;
    ${transition};
    
    svg {
        ${transition};
    }
    
    :hover {
        background: ${blue};
        
        svg {
            color: ${white} !important;
        }
    }
`

export const InputFileText = styled.span`
    color: ${lightGray};
`

export const InputFileTitle = styled.span`
    color: ${black};
`

export const FileListWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
`