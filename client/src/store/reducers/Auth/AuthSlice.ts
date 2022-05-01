import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changePassword, confirmRecoveryToken, getRecoveryToken, login} from "./Actions";
import {IChangePassword} from "./Models";

interface AuthState {
    isAuth: boolean,
    changePasswordStep: number,
    redirectToLogin: boolean,
    errors: IChangePassword | null
}

const initialState: AuthState = {
    isAuth: false,
    changePasswordStep: 1,
    redirectToLogin: false,
    errors: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRedirect: (state) => {
            state.redirectToLogin = true
        },
        disableRedirect: (state) => {
            state.redirectToLogin = false
            state.changePasswordStep = 1
        }
    },
    extraReducers: {
        [login.pending.type]: (state) => {
            //loader
        },
        [login.fulfilled.type]: (state) => {
            state.isAuth = true
            state.errors = null
        },
        [login.rejected.type]: (state, action: PayloadAction<IChangePassword>) => {
            state.errors = action.payload
        },
        [getRecoveryToken.pending.type]: (state) => {
            //loader
        },
        [getRecoveryToken.fulfilled.type]: (state) => {
            state.changePasswordStep = 2
            state.errors = null
        },
        [getRecoveryToken.rejected.type]: (state, action: PayloadAction<IChangePassword>) => {
            state.errors = action.payload
        },
        [confirmRecoveryToken.pending.type]: (state) => {
            //loader
        },
        [confirmRecoveryToken.fulfilled.type]: (state) => {
            state.changePasswordStep = 3
            state.errors = null
        },
        [confirmRecoveryToken.rejected.type]: (state, action: PayloadAction<IChangePassword>) => {
            state.errors = action.payload
        },
        [changePassword.pending.type]: (state) => {
            //loader
        },
        [changePassword.fulfilled.type]: (state) => {
            state.redirectToLogin = true
            state.errors = null
        },
        [changePassword.rejected.type]: (state, action: PayloadAction<IChangePassword>) => {
            state.errors = action.payload
        },
    }
})

export default authSlice.reducer