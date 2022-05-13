import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import { createApi } from '@reduxjs/toolkit/query/react'
import browserHistory from "../routes/history";
import {RoutesList} from "../const";
import {IPaginationData} from "../types/pagination";
import {ICreateRequest, IMessage, IRequest, IRequestFilter} from "../store/reducers/Requests/Interfaces";
import {INews} from "../store/reducers/News/Interfaces";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/news',
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

export const newsAPI = createApi({
    reducerPath: 'newsAPI',
    baseQuery: queryInterceptor,
    tagTypes: ['News', 'DetailNews'],
    endpoints: (build) => ({
        getNews: build.query<IPaginationData<INews>, number>({
            query: (page) => ({
                url: `/get-all`,
                params: {
                    page: page
                }
            }),
            providesTags: result => ['News']
        }),
        getDetailNews: build.query<INews, string>({
            query: (id) => ({
                url: `/get/${id}`,
            }),
            providesTags: result => ['DetailNews']
        }),
        createNews: build.mutation<INews, FormData>({
            query: (data) => ({
                url: `/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['News']
        }),
        updateNews: build.mutation<INews, FormData>({
            query: (data) => ({
                url: `/update`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['News', 'DetailNews']
        }),
        deleteNews: build.mutation<void, number>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['News']
        }),
    })
})