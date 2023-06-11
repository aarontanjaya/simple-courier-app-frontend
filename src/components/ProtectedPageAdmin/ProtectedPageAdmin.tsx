import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROLES } from '../../constants/roles';
import { useLazyGetCredentialsQuery } from '../../services/auth';
import { RootState } from '../../store';
import { setCredentials } from '../../store/slices/authSlice';

export default function ProtectedPageAdmin() {
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
          if (!res.scope.includes(ROLES.Admin)) {
            const from = location.state?.from?.pathname;
            if (!from && res.scope.includes(ROLES.User)) {
              navigate('/shippings', { replace: true });
              return;
            }
            navigate(from ? from : '/', { replace: true });
          }
        })
        .catch(() => {
          navigate('/login', { replace: true });
        });
    }
  }, []);

  const from = location.state?.from?.pathname;
  if (user && user.scope.includes(ROLES.User)) {
    if (from) {
      return <Navigate to={from} replace={true} />;
    }
    return <Navigate to='/shippings' replace={true} />;
  }

  return <Outlet />;
}
