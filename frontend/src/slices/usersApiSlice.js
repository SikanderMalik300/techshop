// usersApiSlice.js
import { BASE_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}${USERS_URL}/login`, // Correct endpoint: /login instead of /auth
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}${USERS_URL}`, // Correct endpoint: /login instead of /auth
                method: 'POST',
                body: data,
            }),

        }),
        logout: builder.mutation({
        query: () => ({
            url: `${USERS_URL}/logout`,
            method: 'POST',
        })
    })
    }),
    
});

export const { useLoginMutation, useLogoutMutation , useRegisterMutation } = usersApiSlice;

export default usersApiSlice;
