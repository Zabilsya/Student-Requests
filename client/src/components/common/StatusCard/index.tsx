import React, {FC} from 'react';
import {StatusCardStyled, StatusCardText, StatusCardCircle} from "./styles";
import {IStatus} from "../../../store/reducers/Requests/Interfaces";

const StatusCard: FC<IStatus> = ({id, name}) => {
    return (
        <StatusCardStyled>
            <StatusCardCircle status={id} />
            <StatusCardText>
                {name}
            </StatusCardText>
        </StatusCardStyled>
    );
};

export default StatusCard