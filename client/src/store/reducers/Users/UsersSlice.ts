import {IUser} from "./Models"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getProfile} from "./Actions";

interface UsersState {
    users: IUser[],
    profile: IUser | null,
    isLoadedProfile: boolean
    errors: object | null
}

const initialState: UsersState = {
    users: [],
    profile: null,
    isLoadedProfile: false,
    errors: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getProfile.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.profile = action.payload
            state.isLoadedProfile = true
        },
        [getProfile.pending.type]: (state) => {
            state.isLoadedProfile = false
        },
        [getProfile.rejected.type]: (state, action: PayloadAction<object>) => {
            state.errors = action.payload
            state.isLoadedProfile = true
        }
    }
})

export default usersSlice.reducer