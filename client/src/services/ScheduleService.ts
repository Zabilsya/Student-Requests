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
        createSchedule: build.mutation<ISchedule, ISchedule>({
            query: (post) => ({
                url: `/create`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Schedule']
        }),
        // updatePost: build.mutation<IPost, IPost>({
        //     query: (post) => ({
        //         url: `/posts/${post.id}`,
        //         method: 'PUT',
        //         body: post
        //     }),
        //     invalidatesTags: ['Post']
        // }),
        // deletePost: build.mutation<IPost, IPost>({
        //     query: (post) => ({
        //         url: `/posts/${post.id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Post']
        // }),
    })
})