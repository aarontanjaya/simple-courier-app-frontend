import React from 'react';
import FormLogin from '../components/FormLogin/FormLogin';
import styles from './Login.module.scss';
export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.container__sidebar}>
        <div className={styles.image} />
      </div>
      <div className={styles.container__form}>
        <div className={styles.container__content}>
          <h1 className={styles.title}>Login</h1>
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
