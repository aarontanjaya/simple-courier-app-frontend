import moment from 'moment';
import React from 'react';
import { IUserVoucher } from '../../interfaces/promo';
import Card from '../UI/Card/Card';
import Currency from '../UI/Currency/Currency';
import styles from './CardUserVoucher.module.scss';

type CardUserVoucherProps = {
  data: IUserVoucher;
  selectedDataId?: number;
  onSelect?: (item: IUserVoucher) => void;
  disabled?: boolean;
};
export default function CardUserVoucher({
  data,
  selectedDataId,
  onSelect,
  disabled=false,
}: CardUserVoucherProps) {
  return (
    <Card
      onClick={() => (onSelect && !disabled ? onSelect(data) : undefined)}
      className={`${styles.card__container} ${
        selectedDataId == data.id ? styles.active : ''
      } ${disabled ? styles.disabled : ''}`}
    >
      <div className={`${styles.card__title}`}>
        <h2>{`${(data.promo.discount * 100).toFixed(2)}%OFF`}</h2>
      </div>
      <div className={`${styles.card__discount}`}>
        <p>{'Max Discount'}&nbsp;</p>
        <Currency
          locales='en-ID'
          currency='IDR'
          value={data.promo.max_discount}
        />
        <p>{', Minimum Purchase'}&nbsp;</p>
        <Currency locales='en-ID' currency='IDR' value={data.promo.min_fee} />
      </div>
      <div className={styles.footer}>
        <p>{moment(data.exp_date).format('LL')}</p>
      </div>
    </Card>
  );
}
