import React, {ChangeEvent, FC, KeyboardEvent, FormEvent, KeyboardEventHandler, useRef, useState} from "react";
import {InputChatButtonWrapper, InputChatFileButton, InputChatSendButton, InputChatStyled, InputChatWrapper} from "./styles";
import {ReactChange} from "../../../types/react";
import {IoAttachOutline, IoSend} from "react-icons/io5";
import {gray, white} from "../../../const/styles";

interface Props  {
    onSendMessage: (message: string) => void
    onSendMessageWithFiles: (form: FormData) => void
    error?: string | null
}

const InputChat: FC<Props> = ({onSendMessage, onSendMessageWithFiles}) => {
    const [value, setValue] = useState('')
    const inputFileRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>

    const changeValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value)
    }

    const sendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (value.trim()) {
            onSendMessage(value)
            setTimeout(() => {
                setValue('')
            })
        }
    }

    const sendMessageFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addedFiles = event.target.files || []
        if (addedFiles.length > 0) {
            const formData = new FormData()
            Array.from(addedFiles).forEach(file => {
                formData.append('files', file as Blob)
            })
            onSendMessageWithFiles(formData)
        }
    }


    const keyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.code === 'Enter' && buttonRef && buttonRef.current) {
            buttonRef.current.click()
        }
    }

    return (
        <InputChatWrapper onSubmit={sendMessage}>
            <InputChatStyled
                rows={1}
                placeholder="Введите сообщение..."
                value={value}
                onChange={changeValue}
                onKeyPress={keyPress}
            />

            <InputChatButtonWrapper>
                <InputChatFileButton type="button" onClick={() => inputFileRef.current.click()}>
                    <IoAttachOutline size="26px" color="#B4B4B4" />
                    <input ref={inputFileRef} type="file" onChange={sendMessageFiles} hidden multiple />
                </InputChatFileButton>
                <InputChatSendButton ref={buttonRef} type="submit">
                    <IoSend size="18px" color={white} />
                </InputChatSendButton>
            </InputChatButtonWrapper>

        </InputChatWrapper>
    )
}

export default InputChat