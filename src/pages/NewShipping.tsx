import React from 'react';
import FormCreateShipping from '../components/FormCreateShipping/FormCreateShipping';
import ModalSelectAddress from '../components/ModalSelectAddress/ModalSelectAddress';
import styles from './NewShipping.module.scss';
export default function NewShipping() {
  return (
    <div className={`${styles.container}`}>
      <FormCreateShipping />
    </div>
  );
}
