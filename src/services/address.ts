import { Api } from '.';
import {
  IAddressCreateRequest,
  IAddressesResponse,
  IAddressUpdateRequest,
} from '../interfaces/addresses';
import { IPaginationRequest, IAdminAddressPaginationRequest } from '../interfaces/pagination';

export const addressApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAddresses: builder.query<IAddressesResponse, IAdminAddressPaginationRequest>({
      query: (params: IAdminAddressPaginationRequest) => ({
        url: 'admin/addresses',
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IAddressesResponse,
      providesTags: ['Addresses'],
    }),
    getAddresses: builder.query<IAddressesResponse, IPaginationRequest>({
      query: (params: IPaginationRequest) => ({
        url: '/user/addresses',
        method: 'GET',
        params: params,
      }),
      transformResponse: (res: Record<string, unknown>) =>
        res.data as IAddressesResponse,
      providesTags: ['Addresses'],
    }),
    updateAddress: builder.mutation<Response, IAddressUpdateRequest>({
      query: (address: IAddressUpdateRequest) => ({
        url: `/user/addresses/${address.id}`,
        method: 'PUT',
        body: JSON.stringify(address),
      }),
      invalidatesTags: ['Addresses'],
    }),
    createAddress: builder.mutation<Response, IAddressCreateRequest>({
      query: (address: IAddressCreateRequest) => ({
        url: '/user/addresses',
        method: 'POST',
        body: JSON.stringify(address),
      }),
      invalidatesTags: ['Addresses'],
    }),
    deleteAddress: builder.mutation<Response, number>({
      query: (id: number) => ({
        url: `/user/addresses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Addresses'],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useGetAllAddressesQuery,
  useUpdateAddressMutation,
  useCreateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
