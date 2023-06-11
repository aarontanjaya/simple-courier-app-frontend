import { Api } from '.';
import { IPaymentRequest, IPaymentReportResponse } from '../interfaces/payment';
import { IPeriodRequest } from '../interfaces/report';
export const paymentApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.query<IPaymentReportResponse, IPeriodRequest>({
      query: (req: IPeriodRequest)=>({
        url: 'admin/payment/report',
        params: req,
      }),
      transformResponse: (res: Record<string,unknown>)=>
      res.data as IPaymentReportResponse,
      providesTags: ['PaymentReport'],
    }),
    pay: builder.mutation<Response, IPaymentRequest>({
      query: (payload: IPaymentRequest) => ({
        url: `/user/pay/${payload.payment_id}`,
        method: 'POST',
        body: {
          voucher_id: payload.voucher_id,
        },
      }),
      invalidatesTags: ['PaymentReport','Vouchers', 'Shippings', 'Balance'],
    }),
  }),
});

export const { useGetReportQuery ,usePayMutation } = paymentApi;
