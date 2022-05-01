import apiClient from "../../../services/axios";
import {IUser} from "./Models";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const getProfile = createAsyncThunk('getProfile', async (_, thunkApi) => {
    try {
        const response = await apiClient.get<IUser>('/users/get-profile')
        return response.data
    } catch (error: any) {
        if (error.response.data) {
            return thunkApi.rejectWithValue(error.response.data)
        } else {
            return thunkApi.rejectWithValue('Произошла непредвиденная ошибка')
        }
    }
})