export interface IPagination {
  page_size: number;
  total_count: number;
  page: number;
  page_count: number;
}

export interface IPaginationRequest {
  search: string;
  page_size: number;
  page: number;
}

export type ISortDirection = 'asc' | 'desc';

export interface IPaginationSortRequest {
  search: string;
  page_size: number;
  page: number;
  sort_direction: ISortDirection;
  sort_field: string;
}
export interface IAdminAddressPaginationRequest {
  search: string;
  page_size: number;
  page: number;
  user_id: number;
}
