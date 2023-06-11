import React from 'react';
import FormCreateAddress from '../FormCreateAddress/FormCreateAddress';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import styles from './ModalCreateAddress.module.scss';

type ModalCreateAddressProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalCreateAddress({
  show,
  setShow,
}: ModalCreateAddressProps) {
  return (
    <Modal
      header={
        <div className={`${styles.header}`}>
          <Button variant='transparent' onClick={() => setShow(false)}>
            X
          </Button>
          <h2 className={`${styles.title}`}>Create Address</h2>
        </div>
      }
      show={show}
      setShow={setShow}
    >
      <FormCreateAddress setShow={setShow} />
    </Modal>
  );
}
