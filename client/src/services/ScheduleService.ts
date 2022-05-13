import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import { createApi } from '@reduxjs/toolkit/query/react'
import {IUser} from "../store/reducers/Users/Models";
import browserHistory from "../routes/history";
import {RoutesList} from "../const";
import {ISchedule} from "../store/reducers/Schedule/Models";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/schedule',
    prepareHeaders: (headers => {
        if (localStorage.getItem('jwtToken')) {
            headers.set('Authorization', `Bearer ${localStorage.getItem('jwtToken')}`)
        }
        return headers
    })
})

const queryInterceptor: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions)
        if (result.error && result.error.status === 401) {
            browserHistory.push(RoutesList.Login)
        }
        return result
    }

export const scheduleAPI = createApi({
    reducerPath: 'scheduleAPI',
    baseQuery: queryInterceptor,
    tagTypes: ['Schedule'],
    endpoints: (build) => ({
        getSchedule: build.query<ISchedule[], void>({
            query: () => ({
                url: `/get-all`
            }),
            providesTags: result => ['Schedule']
        }),
        createSchedule: build.mutation<ISchedule, FormData>({
            query: (data) => ({
                url: `/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Schedule']
        }),
        updateSchedule: build.mutation<ISchedule, FormData>({
            query: (data) => ({
                url: `/update`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Schedule']
        }),
        deleteSchedule: build.mutation<ISchedule, number>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Schedule']
        }),
    })
})