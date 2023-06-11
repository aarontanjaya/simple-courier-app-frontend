import React from 'react';
import { useParams } from 'react-router-dom';
import PaymentConfirmation from '../components/PaymentConfirmation/PaymentConfirmation';
import Loader from '../components/UI/Loader/Loader';
import { useGetShippingByIdQuery } from '../services/shipping.';
import styles from './Payment.module.scss';
export default function Payment() {
  const { id } = useParams();
  const { data, error, isError, isLoading } = useGetShippingByIdQuery(
    Number(id)
  );

  return (
    <div className={`${styles.container}`}>
      {isError || data?.payment.status || isLoading ? (
        <Loader />
      ) : (
        <PaymentConfirmation data={data} />
      )}
    </div>
  );
}
