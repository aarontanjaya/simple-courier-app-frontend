import React from 'react';
import styles from './TableHeader.module.scss';
export interface TableColumn {
  title: string;
  index: string;
  render?: React.ReactNode;
}

export type TableHeaderProps = {
  dataSource: TableColumn[];
} & React.ComponentProps<'tr'>;

export default function TableHeader({
  dataSource,
  className = '',
  ...props
}: TableHeaderProps) {
  return (
    <tr className={`${className} ${styles.table__header}`} {...props}>
      {dataSource.map((item) => (
        <th className={`${styles.header__item}`} key={`${item.title}`}>
          {item.render ? item.render : item.title}
        </th>
      ))}
    </tr>
  );
}
