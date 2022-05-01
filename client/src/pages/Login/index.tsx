import React, {ChangeEvent, FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {login} from "../../store/reducers/Auth/Actions";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import PublicLayout from '../../components/layouts/PublicLayout';
import {FormWrapper, MarginWrapper} from "../../components/styled/wrappers";
import {ImageWrapper} from "./styles";
import Link from "../../components/UI/Link";
import {RoutesList} from "../../const";

const Login: FC = () => {
    const { errors } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const submitForm = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(login(form))
    }

    return (
        <FormWrapper>
            <MarginWrapper bottom="30px">
                <ImageWrapper>
                    <img src="images/hselogo.svg" alt="HSE Logo" />
                </ImageWrapper>
            </MarginWrapper>
            <form onSubmit={submitForm}>
                <MarginWrapper bottom="20px">
                    <Input
                        name="email"
                        type="email"
                        label="E-mail"
                        value={form.email}
                        onChange={changeValue}
                        error={errors && errors.email}
                        required
                        autoFocus
                    />
                </MarginWrapper>
                <MarginWrapper bottom="20px">
                    <Input
                        name="password"
                        type="password"
                        label="Пароль"
                        value={form.password}
                        onChange={changeValue}
                        error={errors && errors.password}
                        required
                    />
                </MarginWrapper>
                <MarginWrapper bottom="30px">
                    <Link href={RoutesList.ChangePassword}>Забыли пароль?</Link>
                </MarginWrapper>
                <Button type="submit" fullWidth>Войти</Button>
            </form>
        </FormWrapper>
    );
};

export default Login