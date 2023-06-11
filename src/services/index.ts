import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'query-string';
export const Api = createApi({
  reducerPath: 'authApi',
  tagTypes: [
    'GachaQuota',
    'PaymentReport',
    'Vouchers',
    'Balance',
    'Shippings',
    'Sizes',
    'Categories',
    'AddOns',
    'Addresses',
    'Profile',
    'Promos',
  ],
  baseQuery: fetchBaseQuery({
    paramsSerializer: qs.stringify,
    baseUrl: process.env.REACT_APP_API_URL as string,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});
