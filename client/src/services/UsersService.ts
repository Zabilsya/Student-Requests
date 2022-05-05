import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import { createApi } from '@reduxjs/toolkit/query/react'
import {IUser, IUserFilter} from "../store/reducers/Users/Models";
import browserHistory from "../routes/history";
import {RoutesList} from "../const";
import {IPaginationData} from "../types/pagination";


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/users',
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

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: queryInterceptor,
    tagTypes: ['Users', 'Profile', 'Workers'],
    endpoints: (build) => ({
        getProfile: build.query<IUser, string>({
            query: () => ({
                url: `/get-profile`
            }),
            providesTags: result => ['Profile']
        }),
        getUsers: build.query<IPaginationData<IUser>, IUserFilter>({
            query: ({page, user_type}) => ({
                url: `/get-all`,
                params: {
                    page: page,
                    user_type: user_type
                }
            }),
            providesTags: result => ['Users']
        }),
        getWorkers: build.query<IUser[], void>({
            query: () => ({
                url: `/get-workers`
            }),
            providesTags: result => ['Workers']
        }),
    })
})