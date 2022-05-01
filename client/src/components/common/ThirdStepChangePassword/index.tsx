import React, {ChangeEvent, FC} from "react";
import {useAppDispatch} from "../../../hooks/redux";
import {changePassword} from "../../../store/reducers/Auth/Actions";
import {MarginWrapper} from "../../styled/wrappers";
import Input from "../../UI/Input";
import Link from "../../UI/Link";
import {RoutesList} from "../../../const";
import Button from "../../UI/Button";
import {ReactChange} from "../../../types/react";
import {IChangePassword} from "../../../store/reducers/Auth/Models";
import {authSlice} from "../../../store/reducers/Auth/AuthSlice";
import {Title} from "../../styled/title";

interface Props extends ReactChange<HTMLInputElement> {
    value: IChangePassword,
    errors: IChangePassword | null
}

const ThirdStepChangePassword: FC<Props> = ({value, errors, onChange}) => {
    const dispatch = useAppDispatch()

    const submitForm = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(changePassword(value))
    }

    const goToLogin = () => {
        dispatch(authSlice.actions.setRedirect())
    }

    return (
        <>
            <Title color="blue">Смена пароля - Шаг 3</Title>
            <form onSubmit={submitForm}>
                <MarginWrapper top="30px" bottom="20px">
                    <Input
                        name="password"
                        type="password"
                        label="Новый пароль"
                        value={value.password}
                        onChange={onChange}
                        error={errors && errors.password}
                        required
                        autoFocus
                    />
                </MarginWrapper>
                <MarginWrapper bottom="20px">
                    <Input
                        name="confirmPassword"
                        type="password"
                        label="Повтор нового пароля"
                        value={value.confirmPassword}
                        onChange={onChange}
                        error={errors && errors.confirmPassword}
                        required
                    />
                </MarginWrapper>
                <MarginWrapper bottom="30px">
                    <Link onClick={goToLogin}>Вернуться к авторизации</Link>
                </MarginWrapper>
                <Button type="submit" fullWidth>Подтвердить</Button>
            </form>
        </>
    )
}

export default ThirdStepChangePassword