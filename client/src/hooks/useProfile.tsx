import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "./redux";
import {getProfile} from "../store/reducers/Auth/Actions";
import {authSlice} from "../store/reducers/Auth/AuthSlice";

const useProfile = () => {
    const { profile, isLoadedProfile, isLogin } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProfile())
    }, [isLogin])

    useEffect(() => {
        if (profile) {
            dispatch(authSlice.actions.connectWebSocket())
        }
    }, [profile])

    return { userType: profile?.user_type || false, isLoadingProfile: !isLoadedProfile }
}

export default useProfile