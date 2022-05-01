import styled from "@emotion/styled";
import {backdropOnMobile, black, defaultBlockStyles, white} from "../../const/styles";

interface FormWrapperProps {
    type?: 'modal' | 'default'
}

export const FormWrapper = styled.div<FormWrapperProps>`
    width: 100%;
    max-width: ${({type}) => type === 'modal' ? '800px' : '450px'};
    max-height: 90vh;
    padding: 30px;
    ${defaultBlockStyles};
`

export const ModalWrapper = styled.div`
    background: ${black};
    opacity: .5;
    ${backdropOnMobile}
`

interface FlexWrapperProps {
    gap?: string
}

export const FlexWrapper = styled.div<FlexWrapperProps>`
    display: flex;
    align-items: center;
    gap: ${({gap}) => gap && gap}
`

interface MarginWrapperProps {
    width?: string
    top?: string
    bottom?: string
    left?: string
    right?: string
}

export const MarginWrapper = styled.div<MarginWrapperProps>`
    ${({width}) => width && `width: ${width}`};
    ${({top}) => top && `margin-top: ${top}`};
    ${({bottom}) => bottom && `margin-bottom: ${bottom}`};
    ${({left}) => left && `margin-left: ${left}`};
    ${({right}) => right && `margin-right: ${right}`};
`