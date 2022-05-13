import React, {FC, ReactNode} from "react";
import {ButtonLineStyled, LinkLineStyled} from "./styles";
import {ReactClick} from "../../../types/react";
import {noop} from "../../../const";

interface Props extends ReactClick<HTMLButtonElement> {
    color?: string
    href?: string
    children?: ReactNode | null
}

const Link: FC<Props> = ({color, href, children, onClick = noop}) => {
    return (
        <>
            {href
                ? <LinkLineStyled color={color} to={href}>{children}</LinkLineStyled>
                : <ButtonLineStyled color={color} onClick={onClick}>{children}</ButtonLineStyled>
            }
        </>
    )
}

export default Link