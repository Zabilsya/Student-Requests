import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from './reducers/Auth/AuthSlice'
import {usersAPI} from "../services/UsersService";
import {scheduleAPI} from "../services/ScheduleService";
import {requestTemplatesAPI} from "../services/RequestTemplatesService";
import {requestsAPI} from "../services/RequestsService";

const rootReducer = combineReducers({
    authReducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [scheduleAPI.reducerPath]: scheduleAPI.reducer,
    [requestTemplatesAPI.reducerPath]: requestTemplatesAPI.reducer,
    [requestsAPI.reducerPath]: requestsAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({serializableCheck: false})
                .concat(
                    usersAPI.middleware,
                    scheduleAPI.middleware,
                    requestTemplatesAPI.middleware,
                    requestsAPI.middleware
                ),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']