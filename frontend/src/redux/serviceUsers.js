import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const usersApi = createApi({
    reducerPath: 'fetch_users',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => '/user/',
            providesTags: (result) => result 
            ? [
                ...result.map(({ id }) => ({ type: 'Users', id})),
                { type: 'Users', id: 'LIST' }
            ] 
            : [{ type: 'Users', id: 'LIST' }]
        }),
        addUser: build.mutation({
            query: (user) => ({
                url: '/user/',
                method: 'POST',
                body: user
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }]
        }),
    })
})

export const { useGetUsersQuery, useAddUserMutation } = usersApi