import React from 'react';
import { IAddress } from '../../interfaces/addresses';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import styles from './CardAddress.module.scss';
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';
type CardAddressProps = {
  data: IAddress;
  onEdit: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: (id: number)=>void;
  showDelete: boolean;
};
export function CardAddress({ showDelete, data, onEdit, onDelete }: CardAddressProps) {
  return (
    <Card className={`${styles.card__container}`}>
      <div className={`${styles.card__title}`}>
        <h2>{data.label}</h2>
        {showDelete? <Button onClick={()=>onDelete(data.id)} variant='transparent'><MdDeleteForever className={styles.trash}/></Button> : null}
      </div>
      <div className={`${styles.recipient}`}>
        <h3>{data.recipient_name}</h3>
        <p className={`${styles.phone}`}>{data.recipient_phone}</p>
      </div>
      <p>{data.full_address}</p>
      <div className={`${styles.footer}`}>
        <Button
          onClick={onEdit}
          className={`${styles.button}`}
          variant='border'
        >
          <MdModeEdit /> <p>Edit Address</p>
        </Button>
      </div>
    </Card>
  );
}
