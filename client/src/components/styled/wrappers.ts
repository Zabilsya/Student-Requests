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

export const FilterPanelWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
    padding: 16px 20px;
    margin-bottom: 30px;
    ${defaultBlockStyles};
`

export const PageWrapper = styled.div`
    ${defaultBlockStyles};
    padding: 30px;
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