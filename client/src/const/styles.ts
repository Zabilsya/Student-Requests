import {css} from '@emotion/react'

export const font = 'Roboto'
export const black = '#111111'
export const white = '#FFFFFF'

export const gray = '#D6D6D6'
export const lightGray = '#969EA8'
export const lightBlue = '#F1F9FF'
export const red = '#EB5757'
export const blue = '#005BAB'

export const small = '576px'

export const flexCenter = css`
    display: flex;
    justify-content: center;
`

export const flexFullCenter = css`
    ${flexCenter};
    align-items: center;
`

export const flexEnd = css`
    display: flex;
    justify-content: flex-end;
`

export const flexSpace = css`
    display: flex;
    justify-content: space-between;
`

export const flexColumn = css`
    display: flex;
    flex-direction: column;
`

export const defaultBlockStyles = css`
    background: ${white};
    border-radius: 10px;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.05);
`

export const lighten = (value: number) => css`
    filter: brightness(${value + 1});
`
export const darken = (value: number) => css`
    filter: brightness(${1 - value});
`

export const transition = css`
    transition: all .2s linear;
`

export const backdropOnMobile = css`
    @media screen and (max-width: ${small}) {
        position: fixed;
        display: flex;
        ${flexColumn};
        ${flexEnd};
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
    }
`

export const global = css`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body {
        font-family: ${font}, Arial, sans-serif;
        color: ${black};
        font-size: 14px;
        font-weight: 400;
    }
    a {
        text-decoration: none;
    }
`




