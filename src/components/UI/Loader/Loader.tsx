import React from 'react';
import styles from './Loader.module.scss';
export default function Loader() {
  return (
    <div className={`${styles.background}`}>
      <div className={styles.spinner}></div>
    </div>
  );
}
