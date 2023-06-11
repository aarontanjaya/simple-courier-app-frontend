import React, { useEffect, useState } from 'react';
import { useGetAddressesQuery } from '../../services/address';
import Modal from '../UI/Modal/Modal';
import Search from '../UI/Search/Search';
import debounce from 'lodash.debounce';
import styles from './ModalSelectVoucher.module.scss';
import Pagination from '../UI/Pagination';
import { CardAddressOption } from '../CardAddressOption/CardAddressOption';
import { IAddress } from '../../interfaces/addresses';
import { IPaginationRequest } from '../../interfaces/pagination';
import { useGetActiveUserVouchersQuery } from '../../services/promo';
import CardUserVoucher from '../CardUserVoucher/CardUserVoucher';
import { IUserVoucher } from '../../interfaces/promo';
import Button from '../UI/Button/Button';
type ModalSelectVoucherProps = {
  selected: IUserVoucher | undefined;
  onSelect: (item: IUserVoucher) => void;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  totalCost: number;
};
export default function ModalSelectVoucher({
  selected,
  onSelect,
  show,
  setShow,
  totalCost,
}: ModalSelectVoucherProps) {
  const { data } = useGetActiveUserVouchersQuery();

  return (
    <Modal show={show} setShow={setShow}>
      <div className={`${styles.table__container}`}>
        <div className={`${styles.table__content}`}>
          {data
            ? data.map((item, idx) => {
                return (
                  <CardUserVoucher
                    key={item.id + '-' + idx}
                    data={item}
                    selectedDataId={selected?.id as number}
                    onSelect={onSelect}
                    disabled={totalCost< item.promo.min_fee}
                  />
                );
              })
            : null}
        </div>
        <Button onClick={()=>setShow(false)} className={styles.btn} variant='primary' type='submit'>
          Submit
        </Button>
      </div>
    </Modal>
  );
}
