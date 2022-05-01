import styled from "@emotion/styled";
import {flexCenter, flexSpace, white} from "../../../const/styles";

export const HeaderWrapper = styled.div`
    width: 100%;
    ${flexCenter};
    background: ${white};
    z-index: 1000;
    padding: 15px;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.05);
    border-radius: 0 0 10px 10px;
`

export const HeaderСontent = styled.header`
    width: 100%;
    ${flexSpace};
`

export const Logo = styled.img`
    width: 50px;
    height: 50px;
`

export const SecondWrapper = styled.div`
    ${flexSpace};
    align-items: center;
    gap: 30px;
`