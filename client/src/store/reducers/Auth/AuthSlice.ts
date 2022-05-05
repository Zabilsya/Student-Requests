import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getProfile, changePassword, confirmRecoveryToken, getRecoveryToken, login} from "./Actions";
import {IChangePassword} from "./Models";
import {Socket} from "socket.io-client";
import {IUser} from "../Users/Models";
import {WebSocketService} from "../../../services/websocket";

interface AuthState {
    isAuth: boolean
    profile: IUser |  null
    isLoadedProfile: boolean
    isLogin: boolean
    webSocket: any
    changePasswordStep: number
    redirectToLogin: boolean
    errors: IChangePassword | null
}

const initialState: AuthState = {
    isAuth: false,
    profile: null,
    isLoadedProfile: false,
    isLogin: false,
    webSocket: null,
    changePasswordStep: 1,
    redirectToLogin: false,
    errors: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        connectWebSocket: (state) => {
            state.webSocket = WebSocketService.connect()
        },
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
            state.isLogin = true
            state.errors = null
        },
        [login.rejected.type]: (state, action: PayloadAction<IChangePassword>) => {
            state.errors = action.payload
        },
        [getProfile.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.profile = action.payload
            state.isLoadedProfile = true
            state.isAuth = true
        },
        [getProfile.pending.type]: (state) => {
            state.isLoadedProfile = false
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