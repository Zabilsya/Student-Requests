import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from './reducers/Auth/AuthSlice'
import usersReducer from './reducers/Users/UsersSlice'
import {usersAPI} from "../services/UsersService";

const rootReducer = combineReducers({
    authReducer,
    [usersAPI.reducerPath]: usersAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(
                    usersAPI.middleware
                )
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']