import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CardGachaVoucher from '../components/CardGachaVoucher/CardGachaVoucher';
import Button from '../components/UI/Button/Button';
import Loader from '../components/UI/Loader/Loader';
import { IPromo } from '../interfaces/promo';
import { ErrorResponse } from '../interfaces/response';
import { usePostGachaMutation } from '../services/promo';
import { useGetGachaQuotaQuery } from '../services/user';
import styles from './Gacha.module.scss';
export default function Gacha() {
  const [promo, setPromo] = useState<IPromo | undefined>(undefined);
  const { data: quota } = useGetGachaQuotaQuery();
  const [postGacha, { isLoading }] = usePostGachaMutation();
  const [show, setShow] = useState<boolean>(false);
  const handlePlay = async () => {
    try {
      await postGacha()
        .unwrap()
        .then((res) => {
          setPromo(res);
        });
      toast.success('Play Gacha Successful', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setShow(true);
      return;
    } catch (err) {
      const error = err as FetchBaseQueryError;
      let errMsg = 'Play Gacha Failed';
      if (error.status == 400) {
        errMsg = (error as ErrorResponse).data.message;
      }
      toast.error(errMsg, {
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
      {isLoading ? <Loader /> : null}
      <div className={styles.container}>
        <div className={styles.content__container}>
          <div>
            <h1>Gacha Quota</h1>
            <p className={styles.quota}>{quota?.quota}</p>
          </div>
          <Button
            className={styles.btn}
            variant='border'
            disabled={quota ? quota.quota <= 0 : true}
            onClick={() => handlePlay()}
          >
            Play
          </Button>
        </div>
      </div>
      {promo ? (
        <CardGachaVoucher data={promo} show={show} setShow={setShow} />
      ) : null}
    </>
  );
}
