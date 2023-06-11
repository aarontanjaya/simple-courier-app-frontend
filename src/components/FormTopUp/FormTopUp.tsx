import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ErrorResponse } from '@remix-run/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTopUpMutation } from '../../services/transaction';
import { useGetBalanceQuery } from '../../services/user';
import Button from '../UI/Button/Button';
import Currency from '../UI/Currency/Currency';
import Form from '../UI/Form/Form';
import FormItem from '../UI/FormItem/FormItem';
import Input from '../UI/Input/Input';
import Loader from '../UI/Loader/Loader';
import styles from './FormTopUp.module.scss';
export default function FormTopUp() {
  const [amount, setAmount] = useState<number>(0);
  const { data, isFetching } = useGetBalanceQuery();
  const [topUp, { isLoading }] = useTopUpMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await topUp({
        amount: amount,
      }).unwrap();

      toast.success('Top Up Successful', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setAmount(0);
    } catch (err) {
      const error = err as FetchBaseQueryError;
      let errMsg = 'Payment Failed';
      if (error.status == 400) {
        errMsg = (error as ErrorResponse).data.message;
      }
      toast.error(errMsg, {
        position: 'top-right',
        autoClose: 2500,
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
      {isLoading || isFetching ? <Loader /> : null}
      <Form
        id='top-up-form'
        className={`${styles.form}`}
        onSubmit={handleSubmit}
      >
        <div>
          <h3>Balance</h3>
        </div>
        <div>
          <Currency locales='en-ID' currency='IDR' value={data?.balance} />
        </div>
        <FormItem label='Amount'>
          <Currency locales='en-ID' currency='IDR' value={amount} />
          <Input
            className={styles.input}
            value={Number(amount).toString()}
            disabled={isFetching}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            type='number'
            defaultValue={0}
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
