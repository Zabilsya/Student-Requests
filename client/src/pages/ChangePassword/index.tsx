import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import PublicLayout from '../../components/layouts/PublicLayout';
import {FormWrapper} from "../../components/styled/wrappers";
import FirstStepChangePassword from "../../components/common/FirstStepChangePassword";
import SecondStepChangePassword from "../../components/common/SecondStepChangePassword";
import ThirdStepChangePassword from "../../components/common/ThirdStepChangePassword";
import { authSlice } from "../../store/reducers/Auth/AuthSlice";
import {RoutesList} from "../../const";
import browserHistory from "../../routes/history";

const steps = [
    {component: FirstStepChangePassword},
    {component: SecondStepChangePassword},
    {component: ThirdStepChangePassword},
]

const ChangePassword: FC = () => {
    const { changePasswordStep, redirectToLogin, errors } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        token: ''
    })

    useEffect(() => {
        if (redirectToLogin) {
            browserHistory.push(RoutesList.Login)
            dispatch(authSlice.actions.disableRedirect())
        }
    }, [redirectToLogin])

    const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const StepComponent = steps[changePasswordStep - 1].component

    return (
        <FormWrapper>
            <StepComponent value={form} onChange={changeValue} errors={errors} />
        </FormWrapper>
    );
};

export default ChangePassword