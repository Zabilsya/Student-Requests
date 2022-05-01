import styled from "@emotion/styled";
import {backdropOnMobile, flexFullCenter, lightBlue} from "../../../const/styles";

export const PublicLayoutStyled = styled.main`
    ${flexFullCenter};
    background: ${lightBlue};
    min-height: 100vh;
    ${backdropOnMobile}
`