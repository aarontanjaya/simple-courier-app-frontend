import React from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import styles from './ModalEditPromo.module.scss';
import FormEditPromo from '../FormEditPromo/FormEditPromo';
import { IPromo } from '../../interfaces/promo';
type ModalEditPromoProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: IPromo | undefined;
};
export default function ModalEditPromo({
  show,
  setShow,
  data,
}: ModalEditPromoProps) {
  return (
    <Modal
      header={
        <div className={`${styles.header}`}>
          <Button variant='transparent' onClick={() => setShow(false)}>
            X
          </Button>
          <h2 className={`${styles.title}`}>Edit Promo</h2>
        </div>
      }
      show={show}
      setShow={setShow}
    >
      <FormEditPromo data={data} setShow={setShow} />
    </Modal>
  );
}
