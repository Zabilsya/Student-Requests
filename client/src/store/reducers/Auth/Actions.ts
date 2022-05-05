import apiClient from "../../../services/axios";
import {IChangePassword, IConfirmToken, IEmail, ILogin, IToken} from "./Models";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUser} from "../Users/Models";

export const login = createAsyncThunk('auth', async (data: ILogin, thunkApi) => {
    try {
        const response = await apiClient.post<string>('/auth/login', data)
        localStorage.setItem('jwtToken', response.data)
        return response.data
    } catch (error: any) {
        if (error.response.data) {
            return thunkApi.rejectWithValue(error.response.data)
        } else {
            return thunkApi.rejectWithValue('Произошла непредвиденная ошибка')
        }
    }
})

export const getProfile = createAsyncThunk('getProfile', async (_, thunkApi) => {
    try {
        const response = await apiClient.get<IUser>('/users/get-profile')
        return response.data
    } catch (error: any) {}
})

export const getRecoveryToken = createAsyncThunk('send-token', async (data: IEmail, thunkApi) => {
    try {
        const response = await apiClient.post<string>('/auth/send-token', data)
        return response.data
    } catch (error: any) {
        if (error.response.data) {
            return thunkApi.rejectWithValue(error.response.data)
        } else {
            return thunkApi.rejectWithValue('Произошла непредвиденная ошибка')
        }
    }
})

export const confirmRecoveryToken = createAsyncThunk('confirm-token', async (data: IConfirmToken, thunkApi) => {
    try {
        const response = await apiClient.post<string>('/auth/confirm-token', data)
        return response.data
    } catch (error: any) {
        if (error.response.data) {
            return thunkApi.rejectWithValue(error.response.data)
        } else {
            return thunkApi.rejectWithValue('Произошла непредвиденная ошибка')
        }
    }
})

export const changePassword = createAsyncThunk('change-password', async (data: IChangePassword, thunkApi) => {
    try {
        const response = await apiClient.post<string>('/auth/change-password', data)
        return response.data
    } catch (error: any) {
        if (error.response.data) {
            return thunkApi.rejectWithValue(error.response.data)
        } else {
            return thunkApi.rejectWithValue('Произошла непредвиденная ошибка')
        }
    }
})