import styled from "@emotion/styled";
import {flexColumn, lightGray} from "../../../const/styles";


export const ScheduleItemWrapper = styled.div`
    ${flexColumn};
    width: 100%;
`

export const ScheduleTitle = styled.h2`
    font-size: 18px;
    color: ${lightGray};
`

export const ScheduleFilesWrapper = styled.div`
    ${flexColumn};
    gap: 10px;
`