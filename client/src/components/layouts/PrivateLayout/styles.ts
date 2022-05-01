import styled from "@emotion/styled";
import {flexColumn, lightBlue} from "../../../const/styles";

export const PrivateLayoutStyled = styled.div`
    background: ${lightBlue};
    ${flexColumn};
    align-items: center;
    min-height: 100vh;
`

export const Container = styled.div`
    max-width: 1290px;
    width: 100%;
`

export const MainContainer = styled.main`
    display: flex;
    align-items: flex-start;
    gap: 30px;
    margin-top: 30px;
`

export const Content = styled.div`
    flex-basis: 76%;
`