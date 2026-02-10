import { FC } from 'react';
import { Location, Navigate, useLocation } from 'react-router-dom';

import { Preloader } from '@ui';
import { selectIsAuthChecked, selectUser } from '@selectors';

import { useSelector } from '../../services/store';
import { ProtectedRouteProps } from './type';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  element
}) => {
  const location = useLocation();
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as { from?: Location })?.from;
    return <Navigate to={from?.pathname || '/'} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return element;
};
