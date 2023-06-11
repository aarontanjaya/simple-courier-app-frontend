import React from 'react';
import { IAddress } from '../../interfaces/addresses';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import styles from './ModalEditAddress.module.scss';
import FormEditAddress from '../FormEditAddress/FormEditAddress';
type ModalEditAddressProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: IAddress | undefined;
};
export default function ModalEditAddress({
  show,
  setShow,
  data,
}: ModalEditAddressProps) {
  return (
    <Modal
      header={
        <div className={`${styles.header}`}>
          <Button variant='transparent' onClick={() => setShow(false)}>
            X
          </Button>
          <h2 className={`${styles.title}`}>Edit Address</h2>
          <FormEditAddress setShow={setShow} data={data} />
        </div>
      }
      show={show}
      setShow={setShow}
    ></Modal>
  );
}
