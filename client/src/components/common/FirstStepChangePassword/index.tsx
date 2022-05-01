import React, {ChangeEvent, FC} from "react";
import {useAppDispatch} from "../../../hooks/redux";
import {getRecoveryToken} from "../../../store/reducers/Auth/Actions";
import {MarginWrapper} from "../../styled/wrappers";
import Input from "../../UI/Input";
import Link from "../../UI/Link";
import {Title} from "../../styled/title";
import {RoutesList} from "../../../const";
import Button from "../../UI/Button";
import {ReactChange} from "../../../types/react";
import {IChangePassword} from "../../../store/reducers/Auth/Models";

interface Props extends ReactChange<HTMLInputElement> {
    value: IChangePassword,
    errors: IChangePassword | null
}

const FirstStepChangePassword: FC<Props> = ({value, errors, onChange}) => {
    const { email } = value
    const dispatch = useAppDispatch()

    const submitForm = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(getRecoveryToken({email}))
    }

    return (
        <>
            <Title color="blue">Смена пароля - Шаг 1</Title>
            <form onSubmit={submitForm}>
                <MarginWrapper top="30px" bottom="20px">
                    <Input
                        name="email"
                        type="email"
                        label="E-mail"
                        value={value.email}
                        onChange={onChange}
                        error={errors && errors.email}
                        required
                        autoFocus
                    />
                </MarginWrapper>
                <MarginWrapper bottom="30px">
                    <Link href={RoutesList.Login}>Вернуться к авторизации</Link>
                </MarginWrapper>
                <Button type="submit" fullWidth>Отправить Код</Button>
            </form>
            </>
    )
}

export default FirstStepChangePassword