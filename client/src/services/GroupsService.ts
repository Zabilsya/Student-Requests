import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import { createApi } from '@reduxjs/toolkit/query/react'
import browserHistory from "../routes/history";
import {RoutesList} from "../const";
import {IGroup} from "../store/reducers/Users/Models";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/groups',
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

export const groupsAPI = createApi({
    reducerPath: 'groupsAPI',
    baseQuery: queryInterceptor,
    tagTypes: ['Groups'],
    endpoints: (build) => ({
        getGroups: build.query<IGroup[], void>({
            query: (page) => ({
                url: `/get-all`
            }),
            providesTags: result => ['Groups']
        })
    })
})