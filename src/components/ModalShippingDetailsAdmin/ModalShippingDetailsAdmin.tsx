import React, { useEffect, useState } from 'react';
import { IShipping } from '../../interfaces/shipping';
import ModalShippingDetails from '../ModalShippingDetails/ModalShippingDetails';
import { SHIPPING_STATUS } from '../../constants/shippingStatus';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import Select from 'react-select';
import styles from './ModalShippingDetailsAdmin.module.scss';
import {
  useGetStatusesQuery,
  useUpdateStatusMutation,
} from '../../services/shipping.';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import Loader from '../UI/Loader/Loader';
type ModalShippingDetailsUserProps = {
  data: IShipping | undefined;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

type SelectOption = {
  value: number;
  label: string;
};
export default function ModalShippingDetailsUser({
  data,
  show,
  setShow,
}: ModalShippingDetailsUserProps) {
  const { data: statuses, isFetching } = useGetStatusesQuery();
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();
  const [status, setStatus] = useState<SelectOption | null>(null);

  const handleSubmit = async () => {
    if (status && data) {
      try {
        await updateStatus({
          status_id: status.value,
          shipping_id: data?.id,
        }).unwrap();
        toast.success('Update Status Successful', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setShow(false);
        return;
      } catch (err) {
        const error = err as FetchBaseQueryError;
        toast.error('Update status failed', {
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
      }
    }
    toast.error('No selected data or status', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  useEffect(() => {
    if (data) {
      setStatus({
        value: data.status.id,
        label: data.status.name,
      });
    }
  }, [data, show]);
  return (
    <>
      {isLoading || isFetching ? <Loader /> : null}
      <ModalShippingDetails
        show={show}
        setShow={setShow}
        data={data}
        footer={
          <div className={`${styles.footer}`}>
            <div className={styles.footer__item}>
              <p className={`${styles.content__item__title}`}>Status</p>
              {data ? (
                <Select
                  value={status}
                  name='status'
                  onChange={(e) => setStatus(e)}
                  options={
                    statuses
                      ? statuses.map((item) => ({
                          value: item.id,
                          label: item.name,
                        }))
                      : undefined
                  }
                />
              ) : (
                <p>-</p>
              )}
            </div>

            <div className={styles.button__container}>
              <Button
                disabled={isLoading}
                onClick={handleSubmit}
                className={styles.button__submit}
                variant='primary'
                type='submit'
              >
                Submit
              </Button>
            </div>
          </div>
        }
      />
    </>
  );
}
