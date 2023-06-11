import React, { useEffect, useState } from 'react';
import styles from './Shipping.module.scss';
import Button from '../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { IShipping, IShippingTableRequest } from '../interfaces/shipping';
import Select, { MultiValue } from 'react-select';
import {
  useGetCategoriesQuery,
  useGetShippingQuery,
  useGetSizesQuery,
  useGetStatusesQuery,
} from '../services/shipping.';
import { CardShipping } from '../components/CardShipping/CardShipping';
import Pagination from '../components/UI/Pagination';
import ModalShippingDetailsUser from '../components/ModalShippingDetailsUser/ModalShippingDetailsUser';
import Loader from '../components/UI/Loader/Loader';
interface Option {
  value: number;
  label: string;
}
export default function Shipping() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
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
  const { data, isFetching } = useGetShippingQuery(shippingRequest);
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
  const handleShippingCardClick = (item: IShipping) => {
    setSelectedShipping(item);
    setShowDetails(true);
  };
  useEffect(() => {
    setLoading(
      isFetching || loadingSize || loadingCategories || loadingStatuses
    );
  }, [isFetching, loadingSize, loadingCategories, loadingStatuses]);
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.table__container}`}>
          <div className={`${styles.table__header}`}>
            <Button
              className={`${styles.btn__add}`}
              onClick={() => navigate('/new-shipping')}
              variant='transparent'
            >
              +
            </Button>
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
            {data
              ? data.records.map((item, idx) => {
                  return (
                    <CardShipping
                      className={styles.card__shipping}
                      onClick={() => handleShippingCardClick(item)}
                      key={item.id + '-' + idx}
                      data={item}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <Pagination
        page={shippingRequest.page}
        pageCount={data ? data.page_count : 1}
        onPageChange={handlePageChange}
      />
      <ModalShippingDetailsUser
        data={selectedShipping}
        show={showDetails}
        setShow={setShowDetails}
      />
      {loading ? <Loader /> : null}
    </>
  );
}
