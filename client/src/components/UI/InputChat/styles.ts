import styled from "@emotion/styled";
import {blue, flexFullCenter, flexSpace, lightBlue, red, transition, white} from "../../../const/styles";
import TextareaAutosize from 'react-textarea-autosize';

export const InputChatWrapper = styled.form`
    ${flexSpace};
    align-items: flex-end;
    gap: 40px;
`

export const InputChatStyled = styled(TextareaAutosize)`
    width: 100%;
    border: 1px solid ${white};
    overflow-y: hidden;
    resize: none;
    border-radius: 10px;
    background: ${white};
    padding: 15px 75px 15px 15px;
    outline: none;
    ${transition};
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.05);
  
    :hover {
        border-color: ${blue}
    }
    
    :focus {
        border-color: ${blue};
        box-shadow: 0 0 0 3px rgba(0, 91, 171, 0.15);
    }
`;

export const InputChatButtonWrapper = styled.div`
    ${flexFullCenter};
    gap: 15px;
    height: 100%;
`

export const InputChatFileButton = styled.button`
    ${flexFullCenter};
    width: 34px;
    height: 38px;
    background: ${white};
    border: none;
    cursor: pointer;
`

export const InputChatSendButton = styled.button`
    ${flexFullCenter};
    width: 38px;
    min-width: 38px;
    height: 38px;
    background: ${blue};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    ${transition};
    
    :hover {
        background: #1377CE;
    }
`