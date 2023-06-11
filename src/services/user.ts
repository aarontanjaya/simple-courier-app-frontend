import { ProfileResponse } from '../interfaces/profile';
import { Api } from '.';
import {
  IUserBalanceResponse,
  IUserGachaQuotaResponse,
} from '../interfaces/user';

export const userApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getGachaQuota: builder.query<IUserGachaQuotaResponse, void>({
      query: () => '/user/gacha',
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IUserGachaQuotaResponse,
      providesTags: ['GachaQuota'],
    }),
    getBalance: builder.query<IUserBalanceResponse, void>({
      query: () => '/user/balance',
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IUserBalanceResponse,
      providesTags: ['Balance'],
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => 'profile',
      transformResponse: (res: Record<string, unknown>) =>
        res.data as ProfileResponse,
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<Response, FormData>({
      query: (form) => ({
        url: 'profile',
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetGachaQuotaQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetBalanceQuery,
} = userApi;
