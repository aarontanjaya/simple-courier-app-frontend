import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { IAddressCreateRequest } from '../../interfaces/addresses';
import { useCreateAddressMutation } from '../../services/address';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import FormItem from '../UI/FormItem/FormItem';
import Input from '../UI/Input/Input';
import Loader from '../UI/Loader/Loader';
import TextArea from '../UI/TextArea/TextArea';
import styles from './FormCreateAddress.module.scss';

type FormCreateAddressProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function FormCreateAddress({ setShow }: FormCreateAddressProps) {
  const [address, setAddress] = useState<IAddressCreateRequest>({
    recipient_name: '',
    full_address: '',
    recipient_phone: '',
    label: '',
  });
  const [createAddress, { isLoading }] = useCreateAddressMutation();

  const handleNameChange = (name: string) => {
    setAddress({
      ...address,
      recipient_name: name,
    });
  };

  const handleLabelChange = (label: string) => {
    setAddress({
      ...address,
      label: label,
    });
  };

  const handlePhoneChange = (phone: string) => {
    setAddress({
      ...address,
      recipient_phone: phone,
    });
  };

  const handleAddressChange = (fullAddress: string) => {
    setAddress({
      ...address,
      full_address: fullAddress,
    });
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
        await createAddress({
          label: label,
          full_address: fullAddress,
          recipient_name: name,
          recipient_phone: phone,
        }).unwrap();
        toast.success('Create Address Successful', {
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
        const formElem = document.getElementById('create-address-form');
        formElem ? (formElem as HTMLFormElement).reset() : null;
        return;
      } catch (err) {
        toast.error('Create Address Failed', {
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
  return (
    <>
      {isLoading ? <Loader /> : null}
      <Form
        id='create-address-form'
        className={`${styles.form}`}
        onSubmit={handleSubmit}
      >
        <FormItem label='Label'>
          <Input
            type='text'
            id='address-label'
            placeholder='Insert label'
            required
            onChange={(e) => handleLabelChange(e.target.value)}
            disabled={isLoading}
            name='label'
            value={address.label}
          />
        </FormItem>
        <FormItem label='Recipient Name'>
          <Input
            type='text'
            id='create-address-name'
            placeholder='Insert name'
            required
            onChange={(e) => handleNameChange(e.target.value)}
            name='name'
            disabled={isLoading}
            value={address.recipient_name}
          ></Input>
        </FormItem>
        <FormItem label='Recipient Phone'>
          <Input
            type='tel'
            id='create-address-phone'
            placeholder='Insert phone'
            required
            onChange={(e) => handlePhoneChange(e.target.value)}
            disabled={isLoading}
            name='phone'
            value={address.recipient_phone}
          ></Input>
        </FormItem>
        <FormItem label='Address'>
          <TextArea
            rows={5}
            id='create-address-full'
            placeholder='Insert address'
            disabled={isLoading}
            required
            onChange={(e) => handleAddressChange(e.target.value)}
            name='full_address'
            value={address.full_address}
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
