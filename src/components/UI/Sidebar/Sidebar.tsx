import React from 'react';
import styles from './Sidebar.module.scss';
type SidebarProps = {
  body: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
} & React.ComponentProps<'div'>;

export default function Sidebar({
  children,
  body,
  show,
  setShow,
  ...props
}: SidebarProps) {
  return (
    <>
      <div
        id='mySidenav'
        className={`${styles.sidenav} ${show ? styles.open : ''}`}
        {...props}
      >
        <a className={`${styles.btn__close}`} onClick={() => setShow(false)}>
          &times;
        </a>
        {body}
      </div>
      <div className={`${styles.content} ${show ? styles.open : ''}`}>
        {children}
      </div>
    </>
  );
}
