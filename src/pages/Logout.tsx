import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useLogoutMutation } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { Api } from '../services';
import Loader from '../components/UI/Loader/Loader';
export default function Logout() {
  const [doLogout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(logout());
  dispatch(Api.util.resetApiState());
  useEffect(() => {
    doLogout()
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      });
  }, []);
  return <Loader/>;
}
