import React from 'react';
import { IAddress } from '../../interfaces/addresses';
import Card from '../UI/Card/Card';
import styles from './CardAddressAdmin.module.scss';
type CardAddressAdminProps = {
  data: IAddress;
};
export function CardAddressAdmin({ data }: CardAddressAdminProps) {
  return (
    <Card className={`${styles.card__container}`}>
      <div className={`${styles.card__title}`}>
        <h2>{data.label}</h2>
        <div>
        <h3>{`User ID: ${data.user_id}`}</h3>
        </div>
      </div>
      <div className={`${styles.recipient}`}>
        <h3>{data.recipient_name}</h3>
        <p className={`${styles.phone}`}>{data.recipient_phone}</p>
      </div>
      <p>{data.full_address}</p>
    </Card>
  );
}
