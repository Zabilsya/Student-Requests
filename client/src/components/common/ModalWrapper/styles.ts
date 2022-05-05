import styled from "@emotion/styled";
import {
    defaultBlockStyles,
    small,
    transition
} from "../../../const/styles";


export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, .5);
`

export const ModalContent = styled.div`
    position: absolute;
    top: 40%;
    transform: translate(-50%, -40%);
    left: 50%;
    max-width: 800px;
    width: 100%;
    padding: 30px;
    ${defaultBlockStyles};
    @media screen and (max-width: ${small}) {
        top: unset;
        bottom: 0;
        transform: translate(-50%, 0);
    }
`