import React, { useEffect, useState } from 'react';
import { useGetAddressesQuery } from '../../services/address';
import Modal from '../UI/Modal/Modal';
import Search from '../UI/Search/Search';
import debounce from 'lodash.debounce';
import styles from './ModalSelectAddress.module.scss';
import Pagination from '../UI/Pagination';
import { CardAddressOption } from '../CardAddressOption/CardAddressOption';
import { IAddress } from '../../interfaces/addresses';
import { IPaginationRequest } from '../../interfaces/pagination';
type ModalSelectAddressProps = {
  selected: IAddress | undefined;
  onSelect: (item: IAddress) => void;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ModalSelectAddress({
  selected,
  onSelect,
  show,
  setShow,
}: ModalSelectAddressProps) {
  const [pagination, setPagination] = useState<IPaginationRequest>({
    page_size: 10,
    page: 1,
    search: '',
  });
  const { data } = useGetAddressesQuery(pagination);
  const handlePageChange = (currPage: number) => {
    setPagination({ ...pagination, page: currPage });
  };

  return (
    <Modal show={show} setShow={setShow}>
      <div className={`${styles.table__container}`}>
        <div className={`${styles.table__header}`}>
          <Search
            placeholder='Search here...'
            defaultValue={pagination.search? pagination.search : ''}
            className={`${styles.search}`}
            onChange={debounce(async (e) => {
              setPagination({
                ...pagination,
                page: 1,
                search: e.target.value,
              });
            }, 200)}
          />
        </div>
        <div className={`${styles.table__content}`}>
          {data
            ? data.records.map((item, idx) => {
                return (
                  <CardAddressOption
                    key={item.id + '-' + idx}
                    data={item}
                    selectedData={selected}
                    onSelect={onSelect}
                  />
                );
              })
            : null}
        </div>
      </div>
      <Pagination
        page={pagination.page}
        pageCount={data ? data.page_count : 1}
        onPageChange={handlePageChange}
      ></Pagination>
    </Modal>
  );
}
