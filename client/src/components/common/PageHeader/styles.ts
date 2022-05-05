import styled from "@emotion/styled";
import {defaultBlockStyles, flexSpace} from "../../../const/styles";

interface PageHeaderStyledProps {
    type?: 'separated' | 'combined'
}

export const PageHeaderStyled = styled.div<PageHeaderStyledProps>`
    width: 100%;
    ${flexSpace};
    padding: ${({type}) => type === 'separated' && '16px 10px 16px 20px'};
    ${({type}) => type === 'separated' && defaultBlockStyles};
    margin-bottom: ${({type}) => type === 'separated' && '30px'};
`