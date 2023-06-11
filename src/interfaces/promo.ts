import { IPagination } from './pagination';

export interface IPromo {
  id: number;
  name: string;
  min_fee: number;
  discount: number;
  max_discount: number;
  quota: number;
  limited: boolean;
  exp_date: string;
}
export interface IUserVoucher {
  id: number;
  promo_id: number;
  promo: IPromo;
  user_id: number;
  exp_date: string;
}

export interface IPromoResponse extends IPagination {
  records: IPromo[];
}
