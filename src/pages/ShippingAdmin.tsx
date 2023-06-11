import React, { useEffect, useState } from 'react';
import styles from './ShippingAdmin.module.scss';
import Button from '../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { IShipping, IShippingTableRequest } from '../interfaces/shipping';
import Select, { MultiValue } from 'react-select';
import {
  useGetCategoriesQuery,
  useGetAllShippingQuery,
  useGetSizesQuery,
  useGetStatusesQuery,
} from '../services/shipping.';
import { TableColumn } from '../components/UI/TableHeader/TableHeader';
import { CardShipping } from '../components/CardShipping/CardShipping';
import Pagination from '../components/UI/Pagination';
import ModalShippingDetailsAdmin from '../components/ModalShippingDetailsAdmin/ModalShippingDetailsAdmin';
import moment from 'moment';
import Table from '../components/UI/Table/Table';
import { RowItem } from '../components/UI/TableRow/TableRow';
import Currency from '../components/UI/Currency/Currency';
import Loader from '../components/UI/Loader/Loader';
interface Option {
  value: number;
  label: string;
}
export default function ShippingAdmin() {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedShipping, setSelectedShipping] = useState<
    IShipping | undefined
  >(undefined);
  const [shippingRequest, setShippingRequest] = useState<IShippingTableRequest>(
    {
      page: 1,
      page_size: 10,
      size_ids: [],
      category_ids: [],
      status_ids: [],
    }
  );
  const [tableContent, setTableContent] = useState<RowItem[]>([]);

  const { data, isFetching } = useGetAllShippingQuery(shippingRequest);
  const { data: sizes, isFetching: loadingSize } = useGetSizesQuery();
  const { data: categories, isFetching: loadingCategories } =
    useGetCategoriesQuery();
  const { data: statuses, isFetching: loadingStatuses } = useGetStatusesQuery();
  const handlePageChange = (currPage: number) => {
    setShippingRequest({ ...shippingRequest, page: currPage });
  };
  const handleSizeFilterChange = (e: MultiValue<Option>) => {
    const ids = e.map((item) => item.value);
    setShippingRequest({ ...shippingRequest, size_ids: ids, page: 1 });
  };
  const handleCategoryFilterChange = (e: MultiValue<Option>) => {
    const ids = e.map((item) => item.value);
    setShippingRequest({ ...shippingRequest, category_ids: ids, page: 1 });
  };
  const handleStatusFilterChange = (e: MultiValue<Option>) => {
    const ids = e.map((item) => item.value);
    setShippingRequest({ ...shippingRequest, status_ids: ids, page: 1 });
  };
  const handleRowClick = (item: IShipping) => {
    setSelectedShipping(item);
    setShowDetails(true);
  };
  const tableHeaders: TableColumn[] = [
    { title: 'ID', index: 'id' },
    { title: 'User ID', index: 'user_id' },
    { title: 'Size', index: 'size' },
    { title: 'Category', index: 'category' },
    { title: 'Sales', index: 'sales' },
    { title: 'Status', index: 'status' },
    { title: 'Order Date', index: 'date' },
    { title: 'Action', index: 'action' },
  ];
  useEffect(() => {
    if (data && data.records) {
      const rows = data.records.map((item) => ({
        id: item.id,
        user_id: item.user_id,
        size: item.size.name,
        category: item.category.name,
        sales: (
          <Currency
            locales='en-ID'
            currency='IDR'
            value={item.payment.total_cost}
          />
        ),
        status: item.status.name,
        date: moment(item.date).format('LL'),
        action: (
          <Button variant='border' onClick={() => handleRowClick(item)}>
            Edit
          </Button>
        ),
      }));
      setTableContent(rows);
    }
  }, [data]);
  return (
    <>
      {isFetching || loadingSize || loadingCategories || loadingStatuses ? (
        <Loader />
      ) : null}
      <>
        <div className={`${styles.container}`}>
          <div className={`${styles.table__container}`}>
            <div className={`${styles.table__header}`}>
              <div className={styles.filter__group}>
                <Select
                  className={styles.filter}
                  isMulti
                  placeholder='Size'
                  name='sizes'
                  onChange={(e) => handleSizeFilterChange(e)}
                  options={
                    sizes
                      ? sizes.map((item) => {
                          return {
                            value: item.id,
                            label: item.name,
                          };
                        })
                      : undefined
                  }
                />
                <Select
                  className={styles.filter}
                  isMulti
                  placeholder='Category'
                  name='category'
                  onChange={(e) => handleCategoryFilterChange(e)}
                  options={
                    categories
                      ? categories.map((item) => {
                          return {
                            value: item.id,
                            label: item.name,
                          };
                        })
                      : undefined
                  }
                />
                <Select
                  className={styles.filter}
                  isMulti
                  placeholder='Status'
                  name='status'
                  onChange={(e) => handleStatusFilterChange(e)}
                  options={
                    statuses
                      ? statuses.map((item) => {
                          return {
                            value: item.id,
                            label: item.name,
                          };
                        })
                      : undefined
                  }
                />
              </div>
            </div>
            <div className={`${styles.table__content}`}>
              <Table
                className={styles.table}
                dataSource={tableContent}
                headers={tableHeaders}
              />
            </div>
          </div>
        </div>
        <Pagination
          page={shippingRequest.page}
          pageCount={data ? data.page_count : 1}
          onPageChange={handlePageChange}
        />
        <ModalShippingDetailsAdmin
          data={selectedShipping}
          show={showDetails}
          setShow={setShowDetails}
        />
      </>
    </>
  );
}
