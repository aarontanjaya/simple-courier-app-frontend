import React from 'react';
import styles from './Modal.module.scss';

export type ModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
} & React.ComponentProps<'div'>;
export default function Modal({
  show,
  footer,
  header,
  children,
  setShow,
  className,
  ...props
}: ModalProps) {
  return (
    <>
      {show ? (
        <div onClick={() => setShow(false)} className={`${styles.background}`}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${styles.container} ${className ? className : ''}`}
            {...props}
          >
            {header ? header : null}
            {children ? children : null}
            {footer ? footer : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
