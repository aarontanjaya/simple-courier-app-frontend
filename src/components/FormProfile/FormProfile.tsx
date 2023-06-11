import React, { useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import FormItem from '../UI/FormItem/FormItem';
import Input from '../UI/Input/Input';
import { toast } from 'react-toastify';
import styles from './FormProfile.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorResponse } from '../../interfaces/response';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../services/user';
import Loader from '../UI/Loader/Loader';

export default function FormProfile() {
  const { data, isFetching } = useGetProfileQuery();
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [name, setName] = useState<string | undefined>(data ? data.name : '');
  const [email, setEmail] = useState<string | undefined>(
    data ? data.email : ''
  );
  const [phone, setPhone] = useState<string | undefined>(
    data ? data.phone : ''
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateProfile(formData).then((res) => {
      if ('data' in res) {
        toast.success('Edit Profile Successful', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setErrorMsg('');
      }
      if ('error' in res) {
        const errorPayload = res.error as ErrorResponse;
        setErrorMsg(errorPayload.data.message ? errorPayload.data.message : '');
      }
    });
  };

  useEffect(() => {
    setName(data ? data.name : '');
    setEmail(data ? data.email : '');
    setPhone(data ? data.phone : '');
  }, [data]);

  return (
    <>
      {isFetching || isLoading ? <Loader /> : null}
      <Form onSubmit={handleSubmit} className={`${styles.form}`}>
        <FormItem label='Name'>
          <Input
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
            id='name'
            required
            name='name'
          ></Input>
        </FormItem>
        <FormItem label='Email'>
          <Input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id='email'
            required
            name='email'
          ></Input>
        </FormItem>
        <FormItem label='Phone'>
          <Input
            type='tel'
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            id='phone'
            required
            name='phone'
            pattern='[0-9]*'
          ></Input>
        </FormItem>
        <FormItem label='Photo'>
          <Input type='file' id='photo' name='photo'></Input>
        </FormItem>
        <div className={styles.btn__container}>
          <Button className={styles.btn} variant='primary' type='submit'>
            Submit
          </Button>
        </div>
      </Form>
      {errorMsg ? <span className={`${styles.error}`}>{errorMsg}</span> : null}
    </>
  );
}
