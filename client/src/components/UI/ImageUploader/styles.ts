import styled from "@emotion/styled";

interface ImageWrapperProps {
    image: string
}

export const ImageWrapper = styled.div<ImageWrapperProps>`
    position: relative;
    border-radius: 10px;
    width: 100%;
    height: 180px;
    background-image: url(${({image}) => image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
      :hover {
        button {
            visibility: visible !important;
            opacity: 1 !important;
        }
    }
`