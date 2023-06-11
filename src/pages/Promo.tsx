import React, { useEffect, useState } from 'react';
import { useGetAllPromosQuery } from '../services/promo';
import {
  IPaginationSortRequest,
  ISortDirection,
} from '../interfaces/pagination';
import styles from './Promo.module.scss';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import Button from '../components/UI/Button/Button';
import { RowItem } from '../components/UI/TableRow/TableRow';
import { TableColumn } from '../components/UI/TableHeader/TableHeader';
import Table from '../components/UI/Table/Table';
import Currency from '../components/UI/Currency/Currency';
import moment from 'moment';
import Select, { SingleValue } from 'react-select';
import Pagination from '../components/UI/Pagination';
import Search from '../components/UI/Search/Search';
import debounce from 'lodash.debounce';
import ModalEditPromo from '../components/ModalEditPromo/ModalEditPromo';
import { IPromo } from '../interfaces/promo';
import Loader from '../components/UI/Loader/Loader';
type DirectionOption = SingleValue<{
  value: ISortDirection;
  label: string;
}>;
export default function Promo() {
  const [pagination, setPagination] = useState<IPaginationSortRequest>({
    search: '',
    page_size: 10,
    page: 1,
    sort_direction: 'desc',
    sort_field: 'exp_date',
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPromo, setSelectedPromo] = useState<IPromo | undefined>(
    undefined
  );
  const [tableContent, setTableContent] = useState<RowItem[]>([]);
  const { data, isFetching } = useGetAllPromosQuery(pagination);
  const handlePageChange = (currPage: number) => {
    setPagination({ ...pagination, page: currPage });
  };

  const handleEditPromo = (item: IPromo) => {
    setSelectedPromo(item);
    setShowModal(true);
  };

  const tableHeaders: TableColumn[] = [
    { title: 'ID', index: 'id' },
    { title: 'Name', index: 'name' },
    { title: 'Minimum Fee', index: 'min_fee' },
    { title: 'Discount', index: 'discount' },
    { title: 'Max Discount', index: 'max_discount' },
    { title: 'Remaining Quota', index: 'quota' },
    { title: 'Exp Date', index: 'exp_date' },
    { title: 'Edit', index: 'edit' },
  ];

  const fieldOptions = [
    {
      value: 'quota',
      label: 'Quota',
    },
    {
      value: 'exp_date',
      label: 'Exp Date',
    },
  ];
  const directionOptions: DirectionOption[] = [
    {
      value: 'desc',
      label: 'Descending',
    },
    {
      value: 'asc',
      label: 'Ascending',
    },
  ];
  useEffect(() => {
    if (data && data.records) {
      const rows = data.records.map(
        (item) =>
          ({
            id: item.id,
            name: item.name,
            min_fee: (
              <Currency locales='en-ID' currency='IDR' value={item.min_fee} />
            ),
            discount: (item.discount * 100).toFixed(2) + '%',
            max_discount: (
              <Currency
                locales='en-ID'
                currency='IDR'
                value={item.max_discount}
              />
            ),
            quota: item.limited ? item.quota : 'UNLIMITED',
            exp_date: moment(item.exp_date).format('LL'),
            edit: (
              <Button variant='border' onClick={() => handleEditPromo(item)}>
                Edit
              </Button>
            ),
          } as RowItem)
      );
      setTableContent(rows);
    }
  }, [data]);
  return (
    <>
      {isFetching ? <Loader /> : null}
      <div className={`${styles.container}`}>
        <div className={`${styles.content__container}`}>
          <div className={`${styles.table__header}`}>
            <div className={`${styles.sorter}`}>
              <Select
                className={styles.sorter__item}
                placeholder='Sort Field'
                name='field'
                onChange={(e) =>
                  e
                    ? setPagination({
                        ...pagination,
                        sort_field: e.value,
                        page: 1,
                      })
                    : null
                }
                options={fieldOptions}
              />
              <Select
                className={styles.sorter__item}
                placeholder='Sort Direction'
                name='direction'
                onChange={(e) =>
                  e
                    ? setPagination({
                        ...pagination,
                        sort_direction: e.value,
                        page: 1,
                      })
                    : null
                }
                options={directionOptions}
              />
            </div>
            <Search
              placeholder='Search here...'
              onChange={debounce(async (e) => {
                setPagination({
                  ...pagination,
                  page: 1,
                  search: e.target.value,
                });
              }, 200)}
            />
          </div>
          <div className={styles.table__container}>
            <Table
              className={styles.table}
              dataSource={tableContent}
              headers={tableHeaders}
            />
          </div>
          <Pagination
            page={pagination.page}
            pageCount={data ? data.page_count : 1}
            onPageChange={handlePageChange}
          ></Pagination>
          <ModalEditPromo
            show={showModal}
            setShow={setShowModal}
            data={selectedPromo}
          />
        </div>
      </div>
    </>
  );
}
