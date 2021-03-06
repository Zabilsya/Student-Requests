import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import { createApi } from '@reduxjs/toolkit/query/react'
import browserHistory from "../routes/history";
import {RoutesList} from "../const";
import {IChangeTemplate, IRequestTemplate} from "../store/reducers/RequestTemplates/Models";
import {IPaginationData} from "../types/pagination";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/request-templates',
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

export const requestTemplatesAPI = createApi({
    reducerPath: 'requestTemplatesAPI',
    baseQuery: queryInterceptor,
    tagTypes: ['RequestTemplates', 'RequestAllTemplates', 'RequestTemplatesForUser'],
    endpoints: (build) => ({
        getTemplates: build.query<IPaginationData<IRequestTemplate>, number>({
            query: (page: number) => ({
                url: `/get`,
                params: {
                    page: page
                }
            }),
            providesTags: result => ['RequestTemplates']
        }),
        getAllTemplates: build.query<IRequestTemplate[], void>({
            query: () => ({
                url: `/get-all`
            }),
            providesTags: result => ['RequestAllTemplates']
        }),
        getTemplatesForUser: build.query<IRequestTemplate[], void>({
            query: (data) => ({
                url: `/get-list`
            }),
            providesTags: ['RequestTemplatesForUser']
        }),
        createTemplate: build.mutation<IRequestTemplate, IChangeTemplate>({
            query: (data) => ({
                url: `/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['RequestTemplates']
        }),
        updateTemplate: build.mutation<IChangeTemplate, IChangeTemplate>({
            query: (data) => ({
                url: `/update`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['RequestTemplates']
        }),
        deleteTemplate: build.mutation<IRequestTemplate, number>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['RequestTemplates']
        }),
    })
})