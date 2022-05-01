import React, {FC, ReactNode} from "react";
import {ButtonLineStyled, LinkLineStyled} from "./styles";
import {ReactClick} from "../../../types/react";
import {noop} from "../../../const";

interface Props extends ReactClick<HTMLButtonElement> {
    href?: string
    children?: ReactNode | null
}

const Link: FC<Props> = ({href, children, onClick = noop}) => {
    return (
        <>
            {href
                ? <LinkLineStyled to={href}>{children}</LinkLineStyled>
                : <ButtonLineStyled onClick={onClick}>{children}</ButtonLineStyled>
            }
        </>
    )
}

export default Link