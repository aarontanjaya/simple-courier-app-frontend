import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { IPromo } from '../../interfaces/promo';
import Card from '../UI/Card/Card';
import Currency from '../UI/Currency/Currency';
import styles from './CardGachaVoucher.module.scss';
import Confetti from 'react-confetti';

type CardGachaVoucherProps = {
  data: IPromo;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CardGachaVoucher({
  show,
  setShow,
  data,
}: CardGachaVoucherProps) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {show ? (
        <>
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
          />
          <div
            onClick={() => setShow(false)}
            className={`${styles.background}`}
          >
            <Card
              onClick={(e) => e.stopPropagation()}
              className={`${styles.card__container}`}
            >
              <div className={`${styles.card__title}`}>
                <h2>{`${(data.discount * 100).toFixed(2)}%OFF`}</h2>
              </div>
              <div className={`${styles.card__discount}`}>
                <p>{'Max Discount'}&nbsp;</p>
                <Currency
                  locales='en-ID'
                  currency='IDR'
                  value={data.max_discount}
                />
                <p>{', Minimum Purchase'}&nbsp;</p>
                <Currency locales='en-ID' currency='IDR' value={data.min_fee} />
              </div>
              <div className={styles.footer}>
                <p>{moment(data.exp_date).format('LL')}</p>
              </div>
            </Card>
          </div>
        </>
      ) : null}
    </>
  );
}
