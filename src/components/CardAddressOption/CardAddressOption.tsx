import React from 'react';
import { IAddress } from '../../interfaces/addresses';
import Card from '../UI/Card/Card';
import styles from './CardAddressOption.module.scss';
type CardAddressOptionProps = {
  data: IAddress;
  selectedData?: IAddress | undefined;
  onSelect?: (item: IAddress) => void;
};
export function CardAddressOption({
  data,
  selectedData,
  onSelect,
}: CardAddressOptionProps) {
  return (
    <Card
      onClick={() => onSelect? onSelect(data) : undefined}
      className={`${styles.card__container} ${
        selectedData == data ? styles.active : ''
      }`}
    >
      <div className={`${styles.card__title}`}>
        <h2>{data.label}</h2>
      </div>
      <div className={`${styles.recipient}`}>
        <h3>{data.recipient_name}</h3>
        <p className={`${styles.phone}`}>{data.recipient_phone}</p>
      </div>
      <p>{data.full_address}</p>
    </Card>
  );
}
