import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import { createApi } from '@reduxjs/toolkit/query/react'
import browserHistory from "../routes/history";
import {RoutesList} from "../const";
import {IPaginationData} from "../types/pagination";
import {ICreateRequest, IMessage, IRequest, IRequestFilter} from "../store/reducers/Requests/Interfaces";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/requests',
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

export const requestsAPI = createApi({
    reducerPath: 'requestsAPI',
    baseQuery: queryInterceptor,
    tagTypes: ['Requests', 'DetailRequest'],
    endpoints: (build) => ({
        getRequests: build.query<IPaginationData<IRequest>, IRequestFilter>({
            query: ({page, status_id, template_id}) => ({
                url: `/get-all`,
                params: {
                    page: page,
                    status_id: status_id || '',
                    template_id: template_id || ''
                }
            }),
            providesTags: result => ['Requests']
        }),
        getDetailRequests: build.query<IRequest, number | string>({
            query: (id) => ({
                url: `/get/${id}`,
            }),
            providesTags: result => ['DetailRequest']
        }),
        createRequest: build.mutation<IRequest, FormData>({
            query: (data) => ({
                url: `/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Requests']
        }),
        sendMessageFiles: build.mutation<void, FormData>({
            query: (data) => ({
                url: `/create-message-files`,
                method: 'POST',
                body: data
            })
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