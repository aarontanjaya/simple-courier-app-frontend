import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetBalanceQuery, useGetProfileQuery } from '../../services/user';
import { RootState } from '../../store';
import Currency from '../UI/Currency/Currency';
import Loader from '../UI/Loader/Loader';
import styles from './ProfileAvatar.module.scss';
type ProfileAvatarProps = React.ComponentProps<'div'>;

export default function ProfileAvatar({
  className,
  ...props
}: ProfileAvatarProps) {
  const [imgSrc, setImgSrc] = useState('/assets/images/avatar.jpg');
  const { data, isFetching } = useGetProfileQuery();
  const { data: balance, isFetching: isBalanceLoading } = useGetBalanceQuery();
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (data) {
      setImgSrc(data.photo ? data.photo : '/assets/images/avatar.jpg');
    }
  }, [data]);
  return (
    <>
      {isFetching || isBalanceLoading ? <Loader /> : null}
      <div className={`${styles.container} ${className}`} {...props}>
        <img src={imgSrc} className={`${styles.avatar}`} />
        {user && user.scope.includes('user') ? (
          <>
            <div className={`${styles.referral}`}>
              <h2>Referral Code</h2>
              <h3>{data ? data.referral : ''}</h3>
            </div>
            <div>
              <h2 className={styles.balance__title}>Balance</h2>
              <Currency
                locales='en-ID'
                currency='IDR'
                value={balance ? balance.balance : 0}
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
