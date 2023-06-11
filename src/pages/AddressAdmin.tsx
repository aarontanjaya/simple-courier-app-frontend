import React, { useState } from 'react';
import { IAdminAddressPaginationRequest } from '../interfaces/pagination';
import { useGetAllAddressesQuery } from '../services/address';
import Search from '../components/UI/Search/Search';
import debounce from 'lodash.debounce';
import styles from './AddressAdmin.module.scss';
import Pagination from '../components/UI/Pagination';
import { CardAddressAdmin } from '../components/CardAddressAdmin/CardAddressAdmin';
import Loader from '../components/UI/Loader/Loader';
export default function AddressAdmin() {
  const [pagination, setPagination] = useState<IAdminAddressPaginationRequest>({
    page_size: 10,
    page: 1,
    search: '',
    user_id: 0,
  });
  const { data, isFetching } = useGetAllAddressesQuery(pagination);
  const handlePageChange = (currPage: number) => {
    setPagination({ ...pagination, page: currPage });
  };

  return (
    <>
      {isFetching ? <Loader /> : null}
      <div className={`${styles.container}`}>
        <div className={`${styles.table__container}`}>
          <div className={`${styles.table__header}`}>
            <Search
              placeholder='Search here...'
              className={`${styles.search}`}
              onChange={debounce(async (e) => {
                setPagination({
                  ...pagination,
                  page: 1,
                  search: e.target.value,
                });
              }, 200)}
            />
            <Search
              placeholder='Input user ID here...'
              className={`${styles.search}`}
              type='number'
              onChange={debounce(async (e) => {
                setPagination({
                  ...pagination,
                  page: 1,
                  user_id: e.target.value,
                });
              }, 200)}
            />
          </div>
          <div className={`${styles.table__content}`}>
            {data
              ? data.records.map((item, idx) => {
                  return (
                    <CardAddressAdmin key={item.id + '-' + idx} data={item} />
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <Pagination
        page={pagination.page}
        pageCount={data ? data.page_count : 1}
        onPageChange={handlePageChange}
      ></Pagination>
    </>
  );
}
