import React, {FC, useEffect, useRef, useState} from 'react';
import InputChat from "../../UI/InputChat";
import {ChatWrapper, Messages, Message, MessageText, MessageDateTime} from "./styles";
import {useAppSelector} from "../../../hooks/redux";
import {IMessage} from "../../../store/reducers/Requests/Interfaces";
import {UserTypes} from "../../../const";
import Moment from "react-moment";
import {requestsAPI} from "../../../services/RequestsService";

interface Props {
    messages: IMessage[]
    requestId: number
}

const Chat: FC<Props> = ({messages: propsMessages, requestId}) => {
    const [sendMessageFiles, {}] = requestsAPI.useSendMessageFilesMutation()
    const chatRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const { profile, webSocket } = useAppSelector(state => state.authReducer)
    const [messages, setMessages] = useState<IMessage[]>([])

    useEffect(() => {
        setMessages(propsMessages)
    }, [propsMessages])

    useEffect(() => {
        if (webSocket) {
            webSocket.on(`msgToClient:${requestId}`, (msg: IMessage) => {
                setMessages(state => [...state, msg])
            })
        }
    }, [webSocket])

    useEffect(() => {
        if (chatRef && chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    }, [messages])


    const sendMessage = (message: string) => {
        webSocket?.emit(`msgToServer`, JSON.stringify({
            author_id: profile?.id,
            text: message,
            request_id: requestId,
        }))
    }

    const sendMessageWithFiles = (formData: FormData) => {
        formData.append('request_id', String(requestId))
        formData.append('author_id', String(profile?.id))
        sendMessageFiles(formData)
    }

    const isOwner = (authorId: number, authorType: UserTypes) => {
        if (profile?.user_type === UserTypes.Student) {
            if (authorId === profile?.id) {
                return true
            }
            return false
        } else {
            if (authorType === UserTypes.Student) {
                return false
            }
            return true
        }
    }

    const renderLinksToFiles = (links: string) => {
        const linksArr = links.split(',')
        return linksArr.map((link, index) => {
            const nameMatches = link.match(/#([\s\S]+?)#/)
            let name = ''
            if (nameMatches) {
                name = nameMatches[1]
            }
            const hrefMatches = link.match(/\*([\s\S]+?)\*/)
            let href = ''
            if (hrefMatches) {
                href = hrefMatches[1]
            }
            return <a
                className="message__link"
                href={process.env.REACT_APP_API_URL + '/' + href}
                download
                key={link}
            >
                {name}
                {linksArr.length - 1 !== index && ','}<br/>
            </a>
        })
    }

    return (
        <ChatWrapper>
            <Messages ref={chatRef}>
                {messages.map(message => (
                    <Message owner={isOwner(message.author.id, message.author.user_type)} key={message.id}>
                        <MessageText>
                            {message.is_files
                                ? (
                                    <>
                                        <p>Прикреплены файлы:</p>
                                        <p>{renderLinksToFiles(message.text)}</p>
                                    </>
                                )
                                : message.text
                            }
                        </MessageText>
                        <MessageDateTime>
                            <Moment format="LLL" locale="ru">
                                {message.createdAt}
                            </Moment>
                        </MessageDateTime>
                    </Message>
                ))}
            </Messages>

            <InputChat onSendMessage={sendMessage} onSendMessageWithFiles={sendMessageWithFiles} />

        </ChatWrapper>
    );
};

export default Chat