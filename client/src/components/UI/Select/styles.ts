import {css} from "@emotion/react";
import styled from "@emotion/styled";
import {
    black,
    blue,
    flexColumn,
    gray,
    labelStyles,
    lightBlue,
    lightGray,
    transition,
    white
} from "../../../const/styles";


const styles = css`
    .custom-select__control {
        min-width: 120px !important;
        font-size: 16px;
        padding: 8px 15px;
        background-color: ${white};
        border: 1px solid ${gray};
        border-radius: 10px;
        box-shadow: none !important;
        cursor: pointer;
        ${transition};
        
        &:hover{
          border-color: ${blue} !important;
        }
    }
    
    .custom-select__control--is-focused {
        border-color: ${blue} !important;
    }
    
    .select-full {
        .custom-select__control { 
            padding: 15px;
            font-size: 14px;
            background: ${lightBlue};
            border-color: ${lightBlue} !important;
            
            :hover {
                border-color: ${blue} !important;
            }
        }
        
        .custom-select__control--is-focused {
            border-color: ${blue} !important;
        }
    }
    
    .custom-select__input-container,
    .custom-select__indicator {
        margin: 0 !important;
        padding: 0 !important;
    }
    
    .custom-select__indicator-separator {
        display: none;
    }
    
    .custom-select__multi-value {
        background-color: ${lightGray} !important;
    }

    .custom-select__multi-value__label {
        padding: 6px !important;
        color: ${black} !important;
    }

    .custom-select__multi-value__remove {
        ${transition};
        cursor: pointer;
    }
    
    .custom-select__value-container {
        padding: 0 !important;
    }

    .custom-select__menu {
        margin: .5rem 0 !important;
        z-index: 1000 !important;
    }
    .custom-select__option {
        ${transition};
                
        :hover {
            background: ${lightBlue} !important;
            color: ${black} !important;
            cursor: pointer;
        }
        
        :active {
          background: ${gray} !important;
        }
    }

    .custom-select__option--is-focused {
      background: ${white} !important;
    }

    .custom-select__option--is-selected {
        background: ${blue} !important;
        color: ${white} !important;
    }
  }
`

const selectDefault = css`
    display: flex;
    align-items: center;
    gap: 15px;
`

const selectFullWidth = css`
    width: 100%;
    ${flexColumn};
    gap: 5px;
`

const labelDefault = css`
    font-size: 16px;
    font-weight: 700;
`

const labelFullWidth = css`
    ${labelStyles};
`

interface SelectProps {
    fullWidth: boolean | undefined
}

export const SelectWrapper = styled.div<SelectProps>`
    ${({fullWidth}) => fullWidth ? selectFullWidth : selectDefault};
    ${styles};
`

export const Label = styled.span<SelectProps>`
    ${({fullWidth}) => fullWidth ? labelFullWidth : labelDefault};
`

