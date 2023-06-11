import React, { useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import FormItem from '../UI/FormItem/FormItem';
import Input from '../UI/Input/Input';
import Form from '../UI/Form/Form';
import styles from './FormLogin.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { useLoginMutation } from '../../services/auth';
import { setCredentials } from '../../store/slices/authSlice';
import { UserClaims } from '../../interfaces/user';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import Loader from '../UI/Loader/Loader';

export default function FormLogin() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    try {
      setLoading(true);
      await login({
        email: email,
        password: password,
      })
        .unwrap()
        .then((res) => {
          setLoading(false);
          dispatch(
            setCredentials({
              user: {
                id: res.user_id,
                scope: res.scope.split(' '),
              },
            })
          );
        });
    } catch (err) {
      setLoading(false);
      const error = err as FetchBaseQueryError;
      if (error.status == 401) {
        setErrorMsg('wrong email/password, please try again');
        return;
      }
      setErrorMsg('login failed, please try again later');
    }
  };

  const handleRedirect = (user: UserClaims | null | undefined) => {
    if (user && user.scope.includes('admin')) {
      const from = location.state?.from?.pathname || '/admin/profile';
      navigate(from, { replace: true });
    }
    if (user && user.scope.includes('user')) {
      const from = location.state?.from?.pathname || '/shippings';
      navigate(from, { replace: true });
    }
  };

  useEffect(() => {
    handleRedirect(user);
  }, [user]);

  return (
    <>
      {loading || isLoading ? <Loader /> : null}
      <Form onSubmit={handleLogin} className={`${styles.form}`}>
        <FormItem label='Email'>
          <Input placeholder='Input your email' type='email' id='login-email' required name='email'></Input>
        </FormItem>
        <FormItem label='Password'>
          <Input
            placeholder='Input your password'
            type='password'
            id='login-password'
            required
            name='password'
          ></Input>
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
