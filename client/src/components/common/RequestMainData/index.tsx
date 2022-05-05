import React, {FC} from 'react';
import {
    RequestData,
    RequestDataText,
    RequestDataTitle,
    RequestMainDataWrapper
} from "./styles";
import Moment from "react-moment";
import {UserTypes} from "../../../const";
import {getSurnameWithInitials} from "../../../utils";
import {IRequest} from "../../../store/reducers/Requests/Interfaces";

interface Props extends IRequest {
    userType: UserTypes
}

const RequestMainData: FC<Props> = (props) => {
    const { creator_user, acceptor_user, template, createdAt, updatedAt, userType } = props

    return (
        <RequestMainDataWrapper>
            <RequestData>
                <RequestDataTitle>Дата создания</RequestDataTitle>
                <RequestDataText>
                    <Moment format="LL" locale="ru">
                        {createdAt}
                    </Moment>
                </RequestDataText>
            </RequestData>

            <RequestData>
                <RequestDataTitle>Дата обновления</RequestDataTitle>
                <RequestDataText>
                    <Moment format="LL" locale="ru">
                        {updatedAt}
                    </Moment>
                </RequestDataText>
            </RequestData>

            <RequestData>
                <RequestDataTitle>Тип запроса</RequestDataTitle>
                <RequestDataText>{template.name}</RequestDataText>
            </RequestData>

            {userType !== UserTypes.Student &&
                <RequestData>
                    <RequestDataTitle>ФИО студента</RequestDataTitle>
                    <RequestDataText>{getSurnameWithInitials(creator_user)}</RequestDataText>
                </RequestData>
            }

            {userType !== UserTypes.Student &&
            <>
                <RequestData>
                    <RequestDataTitle>Ответственный</RequestDataTitle>
                    <RequestDataText>{getSurnameWithInitials(template.user)}</RequestDataText>
                </RequestData>

                {acceptor_user &&
                    <RequestData>
                        <RequestDataTitle>Принял запрос</RequestDataTitle>
                        <RequestDataText>{getSurnameWithInitials(acceptor_user)}</RequestDataText>
                    </RequestData>
                }
            </>
            }

        </RequestMainDataWrapper>
    );
};

export default RequestMainData