import React, { useEffect, useState } from 'react';
import FormItem from '../UI/FormItem/FormItem';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './FormEditPromo.module.scss';
import Form from '../UI/Form/Form';
import { IPromo } from '../../interfaces/promo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { toast } from 'react-toastify';
import { useUpdatePromoMutation } from '../../services/promo';
import { ErrorResponse } from '../../interfaces/response';
import Loader from '../UI/Loader/Loader';
type FormEditPromoProps = {
  data: IPromo | undefined;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function FormEditPromo({ data, setShow }: FormEditPromoProps) {
  const [selectedPromo, setSelectedPromo] = useState<IPromo | undefined>(data);
  const [expDate, setExpDate] = useState<Date | null>(
    data ? new Date(data.exp_date) : null
  );
  const [updatePromo, { isLoading }] = useUpdatePromoMutation();
  const handleNameChange = (name: string) => {
    if (selectedPromo) {
      setSelectedPromo({
        ...selectedPromo,
        name: name,
      });
    }
  };

  const handleMinFeeChange = (minFee: number) => {
    if (selectedPromo) {
      setSelectedPromo({
        ...selectedPromo,
        min_fee: minFee,
      });
    }
  };

  const handleDiscountChange = (discount: number) => {
    if (selectedPromo) {
      setSelectedPromo({
        ...selectedPromo,
        discount: discount / 100,
      });
    }
  };

  const handleMaxDiscountChange = (maxDisc: number) => {
    if (selectedPromo) {
      setSelectedPromo({
        ...selectedPromo,
        max_discount: maxDisc,
      });
    }
  };

  const handleQuotaChange = (quota: number) => {
    if (selectedPromo) {
      setSelectedPromo({
        ...selectedPromo,
        quota: quota,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedPromo && expDate) {
      try {
        await updatePromo({
          ...selectedPromo,
          exp_date: expDate.toISOString(),
        }).unwrap();
        toast.success('Edit Promo Successful', {
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
        let errMsg = 'Edit Promo Failed';
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
    setSelectedPromo(data);
  }, [data]);
  return (
    <>
      {isLoading ? <Loader /> : null}
      <Form className={`${styles.form}`} onSubmit={handleSubmit}>
        <FormItem label='Promo Name'>
          <Input
            type='text'
            id='promo-name'
            required
            onChange={(e) => handleNameChange(e.target.value)}
            name='name'
            disabled={!data || isLoading}
            value={selectedPromo ? selectedPromo.name : '-'}
          ></Input>
        </FormItem>
        <FormItem label='Minimum Fee'>
          <Input
            type='number'
            id='minimum-fee'
            required
            onChange={(e) => handleMinFeeChange(Number(e.target.value))}
            disabled={!data || isLoading}
            name='min-fee'
            value={selectedPromo ? selectedPromo.min_fee : 0}
          />
        </FormItem>
        <FormItem label='Discount %'>
          <Input
            type='number'
            id='address-phone'
            required
            onChange={(e) => handleDiscountChange(Number(e.target.value))}
            disabled={!data || isLoading}
            name='discount'
            value={
              selectedPromo ? (selectedPromo.discount * 100).toString() : '0'
            }
          ></Input>
        </FormItem>
        <FormItem label='Max Discount'>
          <Input
            type='number'
            id='max-disc'
            required
            onChange={(e) => handleMaxDiscountChange(Number(e.target.value))}
            disabled={!data || isLoading}
            name='max-disc'
            value={selectedPromo ? selectedPromo.max_discount : 0}
          />
        </FormItem>
        {selectedPromo && selectedPromo.limited ? (
          <FormItem label='Quota'>
            <Input
              type='number'
              id='quota'
              required
              onChange={(e) => handleQuotaChange(Number(e.target.value))}
              disabled={!data || isLoading}
              name='quota'
              value={selectedPromo ? selectedPromo.quota : 0}
            />
          </FormItem>
        ) : null}
        <FormItem label='Exp Date'>
          <DatePicker
            className={styles.input__date}
            selected={expDate}
            placeholderText='Select expiry date'
            minDate={new Date()}
            onChange={(e) => setExpDate(e)}
          />
        </FormItem>
        <div className={styles.btn__container}>
          <Button className={styles.btn} variant='primary' type='submit'>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}
