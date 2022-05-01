import React, {ChangeEvent, FC} from "react";
import {useAppDispatch} from "../../../hooks/redux";
import {confirmRecoveryToken} from "../../../store/reducers/Auth/Actions";
import {MarginWrapper} from "../../styled/wrappers";
import Input from "../../UI/Input";
import Link from "../../UI/Link";
import {RoutesList} from "../../../const";
import Button from "../../UI/Button";
import {ReactChange} from "../../../types/react";
import {IChangePassword, IConfirmToken} from "../../../store/reducers/Auth/Models";
import {authSlice} from "../../../store/reducers/Auth/AuthSlice";
import {Title} from "../../styled/title";

interface Props extends ReactChange<HTMLInputElement> {
    value: IChangePassword,
    errors: IChangePassword | null
}

const SecondStepChangePassword: FC<Props> = ({value, errors, onChange}) => {
    const { email, token } = value
    const dispatch = useAppDispatch()

    const submitForm = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(confirmRecoveryToken({email, token}))
    }

    const goToLogin = () => {
        dispatch(authSlice.actions.setRedirect())
    }

    return (
        <>
            <Title color="blue">Смена пароля - Шаг 2</Title>
            <form onSubmit={submitForm}>
                <MarginWrapper top="30px" bottom="20px">
                    <Input
                        name="token"
                        type="number"
                        label="Код из e-mail сообщения"
                        value={value.token}
                        onChange={onChange}
                        error={errors && errors.token}
                        required
                        autoFocus
                    />
                </MarginWrapper>
                <MarginWrapper bottom="30px">
                    <Link onClick={goToLogin}>Вернуться к авторизации</Link>
                </MarginWrapper>
                <Button type="submit" fullWidth>Продолжить</Button>
            </form>
        </>
    )
}

export default SecondStepChangePassword