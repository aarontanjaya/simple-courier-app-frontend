import React from 'react';
import Modal from '../UI/Modal/Modal';
import { IShipping } from '../../interfaces/shipping';
import styles from './ModalShippingDetails.module.scss';
import moment from 'moment';
import Currency from '../UI/Currency/Currency';
import ShippingDetail from './ShippingDetail';
import Button from '../UI/Button/Button';
type ModalShippingDetailsProps = {
  data: IShipping | undefined;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  footer?: React.ReactNode;
};
export default function ModalShippingDetails({
  data,
  show,
  setShow,
  footer,
}: ModalShippingDetailsProps) {
  return (
    <Modal
      className={styles.content__container}
      show={show}
      setShow={setShow}
      footer={footer}
      header={
        <div className={`${styles.header}`}>
          <Button variant='transparent' onClick={() => setShow(false)}>
            X
          </Button>
          <h2 className={`${styles.title}`}>Shipping Details</h2>
        </div>
      }
    >
      <div>
        <div className={`${styles.content__title}`}>
          <h3>Recipient</h3>
        </div>
        <div className={`${styles.recipient}`}>
          <h3>{data ? data.address.recipient_name : '-'}</h3>
          <p className={`${styles.phone}`}>
            {data ? data.address.recipient_phone : '-'}
          </p>
        </div>
        <div>{data ? data.address.full_address : null}</div>
        <div className={`${styles.content__title} ${styles.card__details}`}>
          <h3>Details</h3>
        </div>
        <div className={`${styles.content__item}`}>
          <p className={`${styles.content__item__title}`}>Order Date</p>
          <p>{data ? moment(data.date).format('LL') : '-'}</p>
        </div>
        {data ? <ShippingDetail title='Size' data={data.size} /> : null}
        {data ? <ShippingDetail title='Category' data={data.category} /> : null}
        {data && data.add_on.length != 0 ? (
          <ShippingDetail title='Add Ons' data={data.add_on} />
        ) : null}
        <div className={`${styles.content__item}`}>
          <p className={`${styles.content__item__title}`}>Total Cost</p>
          <Currency
            locales='en-ID'
            currency='IDR'
            value={data ? data.payment.total_cost : 0}
          />
        </div>
        {data && data.payment.status ? (
          <>
            <div className={`${styles.content__item}`}>
              <p className={`${styles.content__item__title}`}>Total Discount</p>
              <Currency
                locales='en-ID'
                currency='IDR'
                value={data.payment.total_discount*-1}
              />
            </div>
            <div className={`${styles.content__item}`}>
              <p className={`${styles.content__item__title}`}>Total Paid</p>
              <Currency
                locales='en-ID'
                currency='IDR'
                value={data.payment.record.amount*-1}
              />
            </div>
          </>
        ) : null}
      </div>
    </Modal>
  );
}
