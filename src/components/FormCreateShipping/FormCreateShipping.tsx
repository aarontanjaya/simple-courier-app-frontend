import React, { useEffect, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { toast } from 'react-toastify';
import { IAddress, IAddressCreateRequest } from '../../interfaces/addresses';
import { IShippingDetailOption } from '../../interfaces/shipping';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import FormItem from '../UI/FormItem/FormItem';
import Select, { MultiValue, SingleValue } from 'react-select';
import styles from './FormCreateShipping.module.scss';
import {
  useCreateShippingMutation,
  useGetAddonsQuery,
  useGetCategoriesQuery,
  useGetSizesQuery,
} from '../../services/shipping.';
import ModalSelectAddress from '../ModalSelectAddress/ModalSelectAddress';
import { CardAddressOption } from '../CardAddressOption/CardAddressOption';
import CostViewer from '../CostViewer/CostViewer';
import Loader from '../UI/Loader/Loader';

export default function FormCreateShipping() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | undefined>(
    undefined
  );
  const [showSizeErr, setShowSizeErr] = useState<boolean>(false);
  const [showCategoryErr, setShowCategoryErr] = useState<boolean>(false);
  const [showAddressErr, setShowAddressErr] = useState<boolean>(false);

  const [selectedSize, setSelectedSize] =
    useState<SingleValue<IShippingDetailOption>>();
  const [selectedCategory, setSelectedCategory] =
    useState<SingleValue<IShippingDetailOption>>();
  const [selectedAddons, setSelectedAddons] =
    useState<MultiValue<IShippingDetailOption>>();

  const [sizeCost, setSizeCost] = useState<number>(0);
  const [categoryCost, setCategoryCost] = useState<number>(0);
  const [addonsCost, setAddonsCost] = useState<number>(0);
  const { data: categories, isFetching: isCategoriesLoading } =
    useGetCategoriesQuery();
  const { data: sizes, isFetching: isSizesLoading } = useGetSizesQuery();
  const { data: addons, isFetching: isAddonsLoading } = useGetAddonsQuery();

  const [createShipping, { isLoading }] = useCreateShippingMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSizeErr(false);
    setShowCategoryErr(false);
    setShowAddressErr(false);
    if (!selectedAddress) {
      setShowAddressErr(true);
      return;
    }
    if (selectedCategory && selectedSize) {
      try {
        const addonsIds = selectedAddons
          ? selectedAddons.map((item) => item.value)
          : [];
        await createShipping({
          category_id: selectedCategory.value,
          address_id: selectedAddress.id,
          size_id: selectedSize.value,
          add_ons: addonsIds,
        }).unwrap();
        toast.success('Create Shipping Successful', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        resetFields();
        return;
      } catch (err) {
        const error = err as FetchBaseQueryError;
        toast.error('Create Shipping Failed', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  };
  const resetFields = () => {
    setSelectedCategory(undefined);
    setSelectedSize(undefined);
    setSelectedAddons(undefined);
    setSelectedAddress(undefined);
    setShowAddressErr(false);
    setShowCategoryErr(false);
    setShowSizeErr(false);
    setSizeCost(0);
    setCategoryCost(0);
    setAddonsCost(0);
  };

  const handleError = (field: string | undefined) => {
    if (field === 'size') {
      setShowSizeErr(true);
    }
    if (field === 'category') {
      setShowCategoryErr(true);
    }
  };
  const handleSelectAddress = (address: IAddress) => {
    setSelectedAddress(address);
  };
  const handleSizeChange = (e: SingleValue<IShippingDetailOption>) => {
    setSelectedSize(e);
    setSizeCost(e ? e.cost : 0);
  };
  const handleCategoryChange = (e: SingleValue<IShippingDetailOption>) => {
    setSelectedCategory(e);
    setCategoryCost(e ? e.cost : 0);
  };
  const handleAddonsChange = (e: MultiValue<IShippingDetailOption>) => {
    setSelectedAddons(e);
    if (e && e.length != 0) {
      setAddonsCost(
        e.reduce((prev, nxt) => ({
          value: 1,
          label: 'total',
          cost: prev.cost + nxt.cost,
        })).cost
      );
      return;
    }
    setAddonsCost(0);
  };
  return (
    <>
      {isLoading ? <Loader /> : null}
      <Form
        id='create-address-form'
        onInvalid={(e) =>
          handleError((e.target as React.ComponentProps<'input'>).name)
        }
        className={`${styles.form}`}
        onSubmit={handleSubmit}
      >
        <FormItem label='Size'>
          <Select
            required
            isLoading={isSizesLoading || isLoading}
            onChange={(e) => handleSizeChange(e)}
            value={selectedSize ? selectedSize : null}
            options={
              sizes
                ? sizes.map((item) => {
                    return {
                      value: item.id,
                      label: item.name,
                      cost: item.price,
                    };
                  })
                : undefined
            }
            name='size'
          />
        </FormItem>
        {showSizeErr && !selectedSize ? (
          <span className={`${styles.error}`}>
            {'Please select size value'}
          </span>
        ) : null}
        <FormItem label='Category'>
          <Select
            required
            value={selectedCategory ? selectedCategory : null}
            isLoading={isCategoriesLoading || isLoading}
            onChange={(e) => handleCategoryChange(e)}
            options={
              categories
                ? categories.map((item) => {
                    return {
                      value: item.id,
                      label: item.name,
                      cost: item.price,
                    };
                  })
                : undefined
            }
            name='category'
          />
        </FormItem>
        {showCategoryErr && !selectedCategory ? (
          <span className={`${styles.error}`}>
            {'Please select category value'}
          </span>
        ) : null}
        <FormItem label='Add On'>
          <Select
            isMulti
            value={selectedAddons ? selectedAddons : null}
            isLoading={isAddonsLoading || isLoading}
            name='add-on'
            onChange={(e) => handleAddonsChange(e)}
            options={
              addons
                ? addons.map((item) => {
                    return {
                      value: item.id,
                      label: item.name,
                      cost: item.price,
                    };
                  })
                : undefined
            }
          />
        </FormItem>
        {selectedAddress ? (
          <CardAddressOption
            key={selectedAddress.id}
            data={selectedAddress}
            onSelect={() => setShowModal(true)}
          />
        ) : (
          <Button
            disabled={isLoading}
            onClick={() => setShowModal(true)}
            type='button'
            variant='transparent'
          >
            Choose Address
          </Button>
        )}
        {showAddressErr && !selectedAddress ? (
          <span className={`${styles.error}`}>
            {'Please select delivery address'}
          </span>
        ) : null}
        <CostViewer
          locales='en-ID'
          currency='IDR'
          sizeCost={sizeCost}
          categoryCost={categoryCost}
          addonsCost={addonsCost}
        />
        <div className={styles.btn__container}>
          <Button className={styles.btn} variant='primary' type='submit'>
            Submit
          </Button>
        </div>
      </Form>
      <ModalSelectAddress
        selected={selectedAddress}
        onSelect={handleSelectAddress}
        show={showModal}
        setShow={setShowModal}
      />
    </>
  );
}
