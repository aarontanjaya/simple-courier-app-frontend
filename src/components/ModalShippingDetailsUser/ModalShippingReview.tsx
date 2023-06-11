import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IShipping } from '../../interfaces/shipping';
import { useReviewShippingMutation } from '../../services/shipping.';
import Button from '../UI/Button/Button';
import StarRating from '../UI/StarRating/StarRating';
import TextArea from '../UI/TextArea/TextArea';
import styles from './ModalShippingReview.module.scss';

type ModalShippingReviewProps = {
  data: IShipping | undefined;
  className?: string | undefined;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ModalShippingReview({
  data,
  className,
  setShow,
}: ModalShippingReviewProps) {
  const [userReview, setUserReview] = useState<string | undefined>(
    data?.comment
  );
  const [userRating, setUserRating] = useState<number>(
    data?.rating ? data.rating : 0
  );
  const [showErr, setShowErr] = useState<boolean>(false);
  const [reviewShipping, { isLoading }] = useReviewShippingMutation();
  const handleSubmit = async () => {
    if (!userReview || userRating == 0) {
      setShowErr(true);
      return;
    }
    if (data) {
      try {
        await reviewShipping({
          id: data.id,
          rating: userRating,
          comment: userReview,
        }).unwrap();
        toast.success('Create Review Successful', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setShow(false);
        return;
      } catch (err) {
        const error = err as FetchBaseQueryError;
        toast.error('Create Review Failed', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  };
  return (
    <div className={`${className ? className : ''}${styles.content__item}`}>
      {data?.comment && data.comment !== '' ? (
        <div className={`${styles.content__item}`}>
          <p className={`${styles.content__item__title}`}>Review</p>
          <StarRating
            className={styles.rating}
            rating={userRating}
            disabled={true}
            setRating={setUserRating}
          />
          <p className={`${styles.comment}`}>{data.comment}</p>
        </div>
      ) : (
        <div className={`${styles.content__item}`}>
          <p className={`${styles.content__item__title}`}>Review</p>
          <StarRating
            className={styles.rating}
            rating={userRating}
            setRating={setUserRating}
          />
          <TextArea
            rows={4}
            onChange={(e) => setUserReview(e.target.value)}
            value={userReview}
          ></TextArea>
          {showErr ? (
            <span className={`${styles.error}`}>
              {'Please input comment and rating'}
            </span>
          ) : null}
          <Button
            onClick={handleSubmit}
            className={`${styles.button}`}
            variant='border'
          >
            Add Review
          </Button>
        </div>
      )}
    </div>
  );
}
