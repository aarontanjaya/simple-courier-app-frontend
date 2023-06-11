import React from 'react';
import Card from '../UI/Card/Card';
import styles from './CardReportItem.module.scss';
type CardReportItemProps = {
  title: string;
  data: React.ReactNode;
} & React.ComponentProps<'div'>;
export default function CardReportItem({
  title,
  data,
  className,
  ...props
}: CardReportItemProps) {
  return (
    <Card className={`${className} ${styles.container}`} {...props}>
      <div>
        <h3 className={`${styles.item__title}`}>{title}</h3>
        <div>{data}</div>
      </div>
    </Card>
  );
}
