import React from 'react';
import Card from '../UI/Card/Card';
import moment from 'moment';
import styles from './CardShipping.module.scss';
import { IShipping } from '../../interfaces/shipping';
import Currency from '../UI/Currency/Currency';
import { SHIPPING_STATUS } from '../../constants/shippingStatus';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';
type CardShippingProps = {
  data: IShipping;
} & React.ComponentProps<'div'>;
export function CardShipping({ data, className, ...props }: CardShippingProps) {
  return (
    <Card
      className={`${styles.card__container} ${className ? className : ''}`}
      {...props}
    >
      <div className={`${styles.card__title}`}>
        <h3>Recipient</h3>
      </div>
      <div className={`${styles.recipient}`}>
        <h3>{data.address.recipient_name}</h3>
        <p className={`${styles.phone}`}>{data.address.recipient_phone}</p>
      </div>
      <div className={`${styles.card__title} ${styles.card__details}`}>
        <h3>Details</h3>
      </div>
      <div className={`${styles.card__item}`}>
        <p className={`${styles.card__item__title}`}>Category</p>
        <p>{data.category.name}</p>
      </div>
      <div className={`${styles.card__item}`}>
        <p className={`${styles.card__item__title}`}>Order Date</p>
        <p>{moment(data.date).format('LL')}</p>
      </div>
      <div className={`${styles.card__item}`}>
        <p className={`${styles.card__item__title}`}>Cost</p>
        <Currency
          locales='en-ID'
          currency='IDR'
          value={data.payment.total_cost}
        />
      </div>
      <div className={`${styles.footer}`}>
        <p className={`${styles.card__item__title}`}>Status</p>
        {data.status_id == SHIPPING_STATUS.Payment ? (
          <Link
            onClick={(e) => e.stopPropagation()}
            className={`${styles.link}`}
            to={`${data.id}/payment`}
          >
            <Button className={`${styles.button}`} variant='border'>
              Pay
            </Button>
          </Link>
        ) : (
          <p>{data.status.name}</p>
        )}
      </div>
    </Card>
  );
}
