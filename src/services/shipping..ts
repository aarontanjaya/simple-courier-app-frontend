import { Api } from '.';
import {
  ShippingCreateRequestBody,
  IShippingDetail,
  IShippingUpdateStatusRequest,
  IShippingResponse,
  IShippingReviewRequest,
  IShippingTableRequest,
  IShippingStatus,
  IShipping,
} from '../interfaces/shipping';

export const shippingApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    updateStatus: builder.mutation<Response, IShippingUpdateStatusRequest>({
      query: (req) => ({
        url: `admin/shippings/${req.shipping_id}/status`,
        method: 'PATCH',
        body: {
          status_id: req.status_id,
        },
      }),
      invalidatesTags: ['Shippings'],
    }),
    reviewShipping: builder.mutation<Response, IShippingReviewRequest>({
      query: (req) => ({
        url: `/user/shippings/${req.id}/review`,
        method: 'POST',
        body: {
          comment: req.comment,
          rating: req.rating,
        },
      }),
      invalidatesTags: ['Shippings'],
    }),
    createShipping: builder.mutation<Response, ShippingCreateRequestBody>({
      query: (body) => ({
        url: '/user/shippings',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Shippings'],
    }),
    getShippingById: builder.query<IShipping, number>({
      query: (id: number) => ({
        url: `/user/shippings/${id}`,
        method: 'GET',
      }),
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IShipping,
    }),
    getAllShipping: builder.query<IShippingResponse, IShippingTableRequest>({
      query: (params: IShippingTableRequest) => ({
        url: 'admin/shippings',
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IShippingResponse,
      providesTags: ['Shippings'],
    }),
    getShipping: builder.query<IShippingResponse, IShippingTableRequest>({
      query: (params: IShippingTableRequest) => ({
        url: '/user/shippings',
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IShippingResponse,
      providesTags: ['Shippings'],
    }),
    getStatuses: builder.query<IShippingStatus[], void>({
      query: () => 'shipping-statuses',
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IShippingStatus[],
    }),
    getSizes: builder.query<IShippingDetail[], void>({
      query: () => 'sizes',
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IShippingDetail[],
      providesTags: ['Sizes'],
    }),
    getCategories: builder.query<IShippingDetail[], void>({
      query: () => 'categories',
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IShippingDetail[],
      providesTags: ['Categories'],
    }),
    getAddons: builder.query<IShippingDetail[], void>({
      query: () => 'add-ons',
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IShippingDetail[],
      providesTags: ['AddOns'],
    }),
  }),
});

export const {
  useCreateShippingMutation,
  useUpdateStatusMutation,
  useReviewShippingMutation,
  useGetSizesQuery,
  useGetCategoriesQuery,
  useGetAddonsQuery,
  useGetStatusesQuery,
  useGetShippingQuery,
  useGetAllShippingQuery,
  useGetShippingByIdQuery,
} = shippingApi;
