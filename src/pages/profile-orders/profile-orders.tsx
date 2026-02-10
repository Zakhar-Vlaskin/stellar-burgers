import { FC, useEffect } from 'react';

import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import {
  selectProfileOrders,
  selectProfileOrdersLoading,
  selectUser
} from '@selectors';
import { fetchProfileOrders } from '@slices';

import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersLoading);

  useEffect(() => {
    if (!user) {
      return;
    }

    dispatch(fetchProfileOrders());

    const intervalId = window.setInterval(() => {
      dispatch(fetchProfileOrders());
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [dispatch, user]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
