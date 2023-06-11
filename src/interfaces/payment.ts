import { ITransaction } from './transaction';

export interface IPayment {
  status: boolean;
  total_cost: number;
  voucher_id: number;
  record: ITransaction;
  total_discount: number;
  id: number;
}

export interface IPaymentRequest{
  voucher_id: number | undefined;
  payment_id: number;
}

export interface IPaymentReportResponse{
  revenue: number;
  total_discount: number;
  average_size:number;
  count:number;
}