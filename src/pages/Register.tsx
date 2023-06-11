import React from 'react';
import FormRegister from '../components/FormRegister/FormRegister';
import styles from './Register.module.scss';
export default function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.container__sidebar}>
        <div className={styles.image} />
      </div>
      <div className={styles.container__form}>
        <div className={styles.container__content}>
          <h1 className={styles.title}>Register</h1>
          <FormRegister />
        </div>
      </div>
    </div>
  );
}
