import { Api } from '.';
import { IPromo, IPromoResponse, IUserVoucher } from '../interfaces/promo';
import { IPaginationSortRequest } from '../interfaces/pagination';
export const promoApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    postGacha: builder.mutation<IPromo, void>({
      query: () => ({
        url: '/user/gacha',
        method: 'POST',
      }),
      invalidatesTags: ['Vouchers', 'GachaQuota'],
      transformResponse: (res: Record<string, unknown>) => res.data as IPromo,
    }),
    updatePromo: builder.mutation<Response, IPromo>({
      query: (req: IPromo) => ({
        url: `/admin/promos/${req.id}`,
        method: 'PUT',
        body: {
          name: req.name,
          min_fee: req.min_fee,
          discount: req.discount,
          max_discount: req.max_discount,
          quota: req.quota,
          limited: req.limited,
          exp_date: req.exp_date,
        },
      }),
      invalidatesTags: ['Promos'],
    }),
    getAllPromos: builder.query<IPromoResponse, IPaginationSortRequest>({
      query: (params: IPaginationSortRequest) => ({
        url: '/admin/promos',
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IPromoResponse,
      providesTags: ['Promos'],
    }),
    getActiveUserVouchers: builder.query<IUserVoucher[], void>({
      query: () => 'user/vouchers',
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IUserVoucher[],
      providesTags: ['Vouchers'],
    }),
  }),
});

export const {
  useGetActiveUserVouchersQuery,
  usePostGachaMutation,
  useGetAllPromosQuery,
  useUpdatePromoMutation,
} = promoApi;
