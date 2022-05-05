import styled from "@emotion/styled";
import {flexColumn, white} from "../../../const/styles";
import {css} from "@emotion/react";

const messageLink = css`
    .message__link {
        color: ${white};
        font-weight: 700;
        font-style: italic;
        line-height: 200%;
        
        :hover {
          text-decoration: underline;
        }
    }
`

export const ChatWrapper = styled.div`
    ${flexColumn};
`

export const Messages = styled.div`
    max-height: 480px;
    overflow-y: auto;
    ${flexColumn};
    align-items: flex-start;
    padding: 15px;
    background: #F5F5F5;
    border-radius: 10px;
    gap: 15px;
`

interface MessageProps {
    owner: boolean
}

export const Message = styled.div<MessageProps>`
    margin-left: ${({owner}) => owner ? "0" : "auto"};
    background: ${({owner}) => owner ? "#0088FF" : "#7E7E7E"};
    border-radius: 10px;
    ${({owner}) => !owner ? "border-top-right-radius: 0" : "border-top-left-radius: 0"};
    color: ${white};
    ${flexColumn};
    gap: 15px;
    padding: 10px 15px;
    ${messageLink};
`


export const MessageText = styled.div`
   line-height: 150%;
`

export const MessageDateTime = styled.div`
    font-weight: 500;
    font-size: 10px;
`