import { IPagination } from './pagination';

export interface IAddressesResponse extends IPagination {
  records: IAddress[];
}

export interface IAddress {
  id: number;
  recipient_name: string;
  full_address: string;
  recipient_phone: string;
  user_id: number;
  label: string;
}

export interface IAddressUpdateRequest{
  id: number;
  recipient_name: string;
  full_address: string;
  recipient_phone: string;
  label: string;
}

export interface IAddressCreateRequest{
  recipient_name: string;
  full_address: string;
  recipient_phone: string;
  label: string;
}
