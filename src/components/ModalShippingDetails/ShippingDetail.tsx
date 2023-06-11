import React from 'react';
import { IShippingDetail } from '../../interfaces/shipping';
import Currency from '../UI/Currency/Currency';
import styles from './ShippingDetail.module.scss';
type ShippingDetailProps = {
  data: IShippingDetail[] | IShippingDetail;
  title: string;
};
export default function ShippingDetail({ data, title }: ShippingDetailProps) {
  return (
    <div>
      <div className={`${styles.content__item}`}>
        <p className={`${styles.content__item__title}`}>{title}</p>
      </div>
      {Array.isArray(data) ? (
        data.map((item) => (
          <div key={item.id} className={styles.content__item}>
            <p>{item.name}</p>
            <Currency locales='en-ID' currency='IDR' value={item.price} />
          </div>
        ))
      ) : (
        <div key={data.id} className={styles.content__item}>
          <p>{data.name}</p>
          <Currency locales='en-ID' currency='IDR' value={data.price} />
        </div>
      )}
    </div>
  );
}
