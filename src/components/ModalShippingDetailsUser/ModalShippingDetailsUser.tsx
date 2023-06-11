import React from 'react';
import { IShipping } from '../../interfaces/shipping';
import ModalShippingDetails from '../ModalShippingDetails/ModalShippingDetails';
import { SHIPPING_STATUS } from '../../constants/shippingStatus';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import styles from './ModalShippingDetailsUser.module.scss';
import ModalShippingReview from './ModalShippingReview';
type ModalShippingDetailsUserProps = {
  data: IShipping | undefined;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ModalShippingDetailsUser({
  data,
  show,
  setShow,
}: ModalShippingDetailsUserProps) {
  return (
    <ModalShippingDetails
      show={show}
      setShow={setShow}
      data={data}
      footer={
        <div className={`${styles.footer}`}>
          <div className={styles.status}>
            <p className={`${styles.content__item__title}`}>Status</p>
            {data?.status_id == SHIPPING_STATUS.Payment ? (
              <Link className={`${styles.link}`} to={`${data.id}/payment`}>
                <Button className={`${styles.button}`} variant='border'>
                  Pay
                </Button>
              </Link>
            ) : (
              <p>{data ? data.status.name : '-'}</p>
            )}
          </div>

          {data?.status_id == SHIPPING_STATUS.Arrived ? (
            <ModalShippingReview setShow={setShow} data={data} />
          ) : null}
        </div>
      }
    />
  );
}
