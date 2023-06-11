import React from 'react';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import FormItem from '../UI/FormItem/FormItem';
import Input from '../UI/Input/Input';
import { toast } from 'react-toastify';
import styles from './FormRegister.module.scss';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/auth';
import 'react-toastify/dist/ReactToastify.css';
export default function FormRegister() {
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const { error, message } = await postRegister(data);
    if (error) {
      toast.error(message, {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    toast.success('Register succesful, redirecting..', {
      position: 'top-right',
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className={`${styles.form}`}>
        <FormItem label='Name'>
          <Input
            placeholder='Insert name..'
            type='text'
            id='name'
            required
            name='name'
          ></Input>
        </FormItem>
        <FormItem label='Email'>
          <Input
            placeholder='Insert email..'
            type='email'
            id='email'
            required
            name='email'
          ></Input>
        </FormItem>
        <FormItem label='Password'>
          <Input
            placeholder='Insert password..'
            type='password'
            id='password'
            required
            name='password'
          ></Input>
        </FormItem>
        <FormItem label='Phone'>
          <Input
            placeholder='Insert phone number..'
            type='tel'
            id='phone'
            required
            name='phone'
            pattern='[0-9()+-]*'
          ></Input>
        </FormItem>
        <FormItem label='Referral'>
          <Input
            placeholder='Insert referral code..'
            type='text'
            id='referral'
            name='referral'
          ></Input>
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
