import React, {useEffect, useState} from 'react'
import {useAppSelector} from "./redux";
import {usersAPI} from "../services/UsersService";

const useProfile = () => {
    const [getProfile, {isLoading, data: profile}] = usersAPI.useLazyGetProfileQuery()
    const { isAuth } = useAppSelector(state => state.authReducer)
    const [isFirstLoad, setIsFirstLoad] = useState(true)

    useEffect(() => {
        if (isAuth || isFirstLoad) {
            getProfile('')
            setIsFirstLoad(false)
        }
    }, [isAuth])

    return { userType: profile?.user_type || false, isLoadingProfile: isLoading }
}

export default useProfile