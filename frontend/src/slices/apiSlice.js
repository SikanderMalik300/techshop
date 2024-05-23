import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({})
});

export const { useGetProductsQuery } = apiSlice;

export default apiSlice;
