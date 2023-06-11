import { IPayment } from './payment';
import { IPagination } from './pagination';
import { IAddress } from './addresses';

export interface IShipping {
  id: number;
  user_id: number;
  rating: number;
  comment: string;
  address_id: number;
  address: IAddress;
  status_id: number;
  status: IShippingStatus;
  category_id: number;
  category: IShippingDetail;
  size_id: number;
  size: IShippingDetail;
  add_on: IShippingDetail[];
  payment_id: number;
  payment: IPayment;
  date: string;
}
export interface IShippingDetail {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface ShippingCreateRequestBody {
  category_id: number;
  address_id: number;
  size_id: number;
  add_ons: number[];
}

export interface IShippingReviewRequest {
  comment: string;
  rating: number;
  id: number;
}

export interface IShippingUpdateStatusRequest {
  status_id: number;
  shipping_id: number;
}
export interface IShippingStatus {
  name: string;
  id: number;
}

export interface IShippingTableRequest {
  page_size: number;
  page: number;
  size_ids: number[];
  category_ids: number[];
  status_ids: number[];
}

export interface IShippingResponse extends IPagination {
  records: IShipping[];
}

export interface IShippingDetailOption {
  value: number;
  label: string;
  cost: number;
}
