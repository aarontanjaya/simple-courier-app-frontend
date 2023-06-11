import React, { useEffect, useState } from 'react';
import PaginationButton from './PaginationButton';
import styles from './index.module.scss';
type PaginationProps = {
  pageSize?: number | null;
  totalCount?: number | null;
  page: number;
  pageCount: number;
  onPageChange: (input: number) => void;
};
export default function Pagination({
  page,
  pageCount,
  onPageChange,
}: PaginationProps) {
  const [pages, setPages] = useState<number[]>([]);
  useEffect(() => {
    const array = [];
    let buttons = 9;
    let curr: number = page - 4 >= 1 ? page - 4 : 1;
    if (pageCount - 8 < page && pageCount - 8 > 0) {
      curr = pageCount - 8;
    }
    while (curr <= pageCount && buttons > 0) {
      array.push(curr);
      curr += 1;
      buttons -= 1;
    }
    setPages(array);
  }, [pageCount, page]);

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.btn__group}`}>
        <PaginationButton
          className={` ${styles.btn}`}
          onClick={() => onPageChange(page - 5)}
          disabled={page <= 5}
        >
          {'<<'}
        </PaginationButton>
        <PaginationButton
          className={` ${styles.btn}`}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          {'<'}
        </PaginationButton>

        {pages.map((item) => (
          <PaginationButton
            onClick={() => onPageChange(item)}
            key={item + 'pagi'}
            className={` ${styles.btn} ${styles[page == item ? 'active' : '']}`}
          >
            {item}
          </PaginationButton>
        ))}
        <PaginationButton
          className={` ${styles.btn}`}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
        >
          {'>'}
        </PaginationButton>
        <PaginationButton
          className={` ${styles.btn} `}
          onClick={() => onPageChange(page + 5)}
          disabled={page >= pageCount - 5}
        >
          {'>>'}
        </PaginationButton>
      </div>
    </div>
  );
}
