import React, { useState } from 'react';
import { CardAddress } from '../components/CardAddress/CardAddress';
import { IPaginationRequest } from '../interfaces/pagination';
import {
  useDeleteAddressMutation,
  useGetAddressesQuery,
} from '../services/address';
import Search from '../components/UI/Search/Search';
import debounce from 'lodash.debounce';
import styles from './Address.module.scss';
import ModalEditAddress from '../components/ModalEditAddress/ModalEditAddress';
import { IAddress } from '../interfaces/addresses';
import Button from '../components/UI/Button/Button';
import ModalCreateAddress from '../components/ModalCreateAddress/ModalCreateAddress';
import Pagination from '../components/UI/Pagination';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import Loader from '../components/UI/Loader/Loader';
export default function Address() {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [chosenAddress, setChosenAddress] = useState<IAddress | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState<IPaginationRequest>({
    page_size: 10,
    page: 1,
    search: '',
  });
  const { data, isFetching } = useGetAddressesQuery(pagination);
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();
  const handlePageChange = (currPage: number) => {
    setPagination({ ...pagination, page: currPage });
  };
  const handleEditAddress = (item: IAddress) => {
    setChosenAddress(item);
    setShowEditModal(true);
  };
  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id).unwrap();
      toast.success('Delete Address Successful', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    } catch (err) {
      const error = err as FetchBaseQueryError;
      toast.error('Delete Address Failed', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <>
      {isFetching || isLoading ? <Loader /> : null}
      <div className={`${styles.container}`}>
        <div className={`${styles.table__container}`}>
          <div className={`${styles.table__header}`}>
            <Button
              onClick={() => setShowCreateModal(true)}
              className={`${styles.btn__add}`}
              variant='transparent'
            >
              +
            </Button>
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
          </div>
          <div className={`${styles.table__content}`}>
            {data
              ? data.records.map((item, idx) => {
                  return (
                    <CardAddress
                      showDelete={true}
                      onDelete={handleDeleteAddress}
                      onEdit={() => handleEditAddress(item)}
                      key={item.id + '-' + idx}
                      data={item}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <ModalEditAddress
        data={chosenAddress}
        show={showEditModal}
        setShow={setShowEditModal}
      />
      <ModalCreateAddress show={showCreateModal} setShow={setShowCreateModal} />
      <Pagination
        page={pagination.page}
        pageCount={data ? data.page_count : 1}
        onPageChange={handlePageChange}
      ></Pagination>
    </>
  );
}
