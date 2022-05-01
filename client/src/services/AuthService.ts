import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import { createApi } from '@reduxjs/toolkit/query/react'
import {IUser} from "../store/reducers/Users/Models";
import {ILogin} from "../store/reducers/Auth/Models";

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + '/auth'
    }),
    tagTypes: ['isAuth'],
    endpoints: (build) => ({
        login: build.mutation<boolean, ILogin>({
            query: (data: ILogin) => ({
                url: `/login`,
                method: 'POST',
                body: data,
            }),
            // transformResponse: (token: number) => {
            //     console.log('gtrgtr')
            //     // localStorage.setItem('jwtToken', token)
            //     return true
            // },
            invalidatesTags: ['isAuth']
        }),
        // createPost: build.mutation<IPost, IPost>({
        //     query: (post) => ({
        //         url: `/posts`,
        //         method: 'POST',
        //         body: post
        //     }),
        //     invalidatesTags: ['Post']
        // }),
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