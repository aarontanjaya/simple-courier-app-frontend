import { Api } from '.';
import { ITopUpRequest } from '../interfaces/transaction';
export const transactionApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    topUp: builder.mutation<Response, ITopUpRequest>({
      query: (req: ITopUpRequest) => ({
        url: '/user/topup',
        method: 'POST',
        body: req,
      }),
      invalidatesTags: ['Balance'],
    }),
  }),
});

export const { useTopUpMutation } = transactionApi;
