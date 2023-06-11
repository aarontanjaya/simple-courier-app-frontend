import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IUserVoucher } from '../../interfaces/promo';
import { ErrorResponse } from '../../interfaces/response';
import { IShipping, IShippingDetail } from '../../interfaces/shipping';
import { usePayMutation } from '../../services/payment';
import CardUserVoucher from '../CardUserVoucher/CardUserVoucher';
import ModalSelectVoucher from '../ModalSelectVoucher/ModalSelectVoucher';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import Currency from '../UI/Currency/Currency';
import Loader from '../UI/Loader/Loader';
import styles from './PaymentConfirmation.module.scss';
export default function PaymentConfirmation({
  data,
}: {
  data: IShipping | undefined;
}) {
  const navigate = useNavigate();
  const [sizeCost, setSizeCost] = useState<number>(0);
  const [categoryCost, setCategoryCost] = useState<number>(0);
  const [addonsCost, setAddonsCost] = useState<number>(0);
  const [selectedVoucher, setSelectedVoucher] = useState<
    IUserVoucher | undefined
  >(undefined);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pay, { isLoading }] = usePayMutation();

  const calculateAddonsCost = (addons: IShippingDetail[]) => {
    setAddonsCost(
      addons.map((item) => item.price).reduce((item, init) => init + item, 0)
    );
  };

  const handleSelectVoucher = (item: IUserVoucher) => {
    if (selectedVoucher && item.id == selectedVoucher.id) {
      setSelectedVoucher(undefined);
      setTotalDiscount(0);
      return;
    }
    let totalDiscount =
      (data?.payment.total_cost as number) * item.promo.discount;
    setSelectedVoucher(item);
    if (totalDiscount > item.promo.max_discount) {
      totalDiscount = item.promo.max_discount;
    }
    setTotalDiscount(totalDiscount);
  };

  const handleSubmit = async () => {
    if (data) {
      try {
        await pay({
          voucher_id: selectedVoucher?.id,
          payment_id: data.payment_id,
        }).unwrap();
        toast.success('Payment Successful', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate('/shippings');
        return;
      } catch (err) {
        const error = err as FetchBaseQueryError;
        let errMsg = 'Payment Failed';
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
    }
  };

  useEffect(() => {
    if (data) {
      setSizeCost(data.size.price);
      setCategoryCost(data.category.price);
      calculateAddonsCost(data.add_on);
    }
  }, [data]);
  return data ? (
    <>
      {isLoading ? <Loader /> : null}
      <Card className={`${styles.container}`}>
        <div className={`${styles.sum__container}`}>
          <div className={`${styles.header}`}>
            <h3>{`Payment ID: ${data.payment_id}`}</h3>
          </div>
          <div className={`${styles.sum__item}`}>
            <p className={styles.subtitle}>Size Cost</p>
          </div>
          <div className={`${styles.sum__item}`}>
            <p>{data.size.name}</p>
            <Currency locales='en-ID' currency='IDR' value={sizeCost} />
          </div>
          <div className={`${styles.sum__item}`}>
            <p className={`${styles.subtitle}`}>Category Cost</p>
          </div>
          <div className={`${styles.sum__item}`}>
            <p>{data.category.name}</p>
            <Currency locales='en-ID' currency='IDR' value={categoryCost} />
          </div>
          {data.add_on.length == 0 ? null : (
            <>
              <div className={`${styles.sum__item}`}>
                <p className={styles.subtitle}>Add-ons Cost</p>
              </div>
              {data.add_on.map((item) => (
                <div key={item.id} className={`${styles.sum__item}`}>
                  <p>{item.name}</p>
                  <Currency locales='en-ID' currency='IDR' value={item.price} />
                </div>
              ))}
              <div className={`${styles.sum__item}`}>
                <p className={styles.subtitle}>Total Add-ons Cost</p>
                <Currency
                  className={styles.subtitle}
                  locales='en-ID'
                  currency='IDR'
                  value={addonsCost}
                />
              </div>
            </>
          )}
          <div className={styles.sum__item}>
            {selectedVoucher ? (
              <CardUserVoucher
                key={selectedVoucher.id}
                data={selectedVoucher}
                onSelect={() => setShowModal(true)}
              />
            ) : (
              <Button
                className={styles.voucher__button}
                type='button'
                variant='border'
                onClick={() => setShowModal(true)}
              >
                Choose Voucher
              </Button>
            )}
          </div>
          {selectedVoucher ? (
            <div className={`${styles.sum__item}`}>
              <p className={styles.subtitle}>Total Discount</p>
              <Currency
                className={styles.subtitle}
                locales='en-ID'
                currency='IDR'
                value={totalDiscount}
              />
            </div>
          ) : null}

          <div className={`${styles.sum__item}`}>
            <p className={styles.subtitle}>Total Cost</p>
            <Currency
              className={styles.subtitle}
              locales='en-ID'
              currency='IDR'
              value={data.payment.total_cost}
            />
          </div>
          <Button
            disabled={isLoading}
            onClick={() => handleSubmit()}
            className={styles.btn__pay}
            variant='border'
          >
            Pay
          </Button>
        </div>
      </Card>
      <ModalSelectVoucher
        show={showModal}
        setShow={setShowModal}
        selected={selectedVoucher}
        onSelect={handleSelectVoucher}
        totalCost={data.payment.total_cost}
      />
    </>
  ) : (
    <h1>404</h1>
  );
}
