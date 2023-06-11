import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { useLazyGetCredentialsQuery } from '../../services/auth';
import { RootState } from '../../store';
import { setCredentials } from '../../store/slices/authSlice';

export default function ProtectedPageGuest() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [getCredentials] = useLazyGetCredentialsQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      getCredentials()
        .unwrap()
        .then((res) => {
          dispatch(
            setCredentials({
              user: {
                id: res.user_id,
                scope: res.scope.split(' '),
              },
            })
          );
          if (res.scope.includes(ROLES.Admin)) {
            navigate('/admin/shippings', { replace: true });
            return;
          }
          if (res.scope.includes(ROLES.User)) {
            navigate('/shippings', { replace: true });
          }
        })
        .catch(() => {
          if (location.pathname == '/' || location.pathname == '') {
            navigate('/login', { replace: true });
          }
        });
    } else {
      if (user.scope.includes(ROLES.User)) {
        navigate('/admin/shippings', { replace: true });
        return;
      }
      if (user.scope.includes(ROLES.Admin)) {
        navigate('/shippings', { replace: true });
        return;
      }
    }
  }, []);

  return <Outlet />;
}
