import React, { useEffect, useState } from 'react';
import FormItem from '../UI/FormItem/FormItem';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import styles from './FormEditAddress.module.scss';
import Form from '../UI/Form/Form';
import { IAddress } from '../../interfaces/addresses';
import TextArea from '../UI/TextArea/TextArea';
import { useUpdateAddressMutation } from '../../services/address';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { toast} from 'react-toastify';
type FormEditAddressProps = {
  data: IAddress | undefined;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function FormEditAddress({
  data,
  setShow,
}: FormEditAddressProps) {
  const [address, setAddress] = useState<IAddress | undefined>(data);
  const [updateAddress, {isLoading}] = useUpdateAddressMutation();
  const handleNameChange = (name: string) => {
    if (address) {
      setAddress({
        ...address,
        recipient_name: name,
      });
    }
  };

  const handleLabelChange = (label: string) => {
    if (address) {
      setAddress({
        ...address,
        label: label,
      });
    }
  };

  const handlePhoneChange = (phone: string) => {
    if (address) {
      setAddress({
        ...address,
        recipient_phone: phone,
      });
    }
  };

  const handleAddressChange = (fullAddress: string) => {
    if (address) {
      setAddress({
        ...address,
        full_address: fullAddress,
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phone = formData.get('phone') as string;
    const name = formData.get('name') as string;
    const fullAddress = formData.get('full_address') as string;
    const label = formData.get('label') as string;
    if (address) {
      try {
        await updateAddress({
          label: label,
          full_address: fullAddress,
          recipient_name: name,
          recipient_phone: phone,
          id: address.id,
        }).unwrap();
        toast.success('Edit Address Successful', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setShow(false);
        return;
      } catch (err) {
        const error = err as FetchBaseQueryError;
        toast.error('Update Address Failed', {
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

  useEffect(() => {
    setAddress(data);
  }, [data]);
  return (
    <>
      <Form className={`${styles.form}`} onSubmit={handleSubmit}>
        <FormItem label='Label'>
          <Input
            type='text'
            id='address-label'
            required
            onChange={(e) => handleLabelChange(e.target.value)}
            disabled={!data || isLoading}
            name='label'
            value={address ? address.label : '-'}
          />
        </FormItem>
        <FormItem label='Recipient Name'>
          <Input
            type='text'
            id='address-name'
            required
            onChange={(e) => handleNameChange(e.target.value)}
            name='name'
            disabled={!data || isLoading}
            value={address ? address.recipient_name : '-'}
          ></Input>
        </FormItem>
        <FormItem label='Recipient Phone'>
          <Input
            type='tel'
            id='address-phone'
            required
            onChange={(e) => handlePhoneChange(e.target.value)}
            disabled={!data || isLoading}
            name='phone'
            value={address ? address.recipient_phone : '-'}
          ></Input>
        </FormItem>
        <FormItem label='Address'>
          <TextArea
            rows={5}
            id='address-full'
            disabled={!data || isLoading}
            required
            onChange={(e) => handleAddressChange(e.target.value)}
            name='full_address'
            value={address ? address.full_address : '-'}
          ></TextArea>
        </FormItem>
        <div className={styles.btn__container}>
          <Button className={styles.btn} variant='primary' type='submit'>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}
