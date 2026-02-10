import { FC } from 'react';

import { OrderInfo } from '@components';

import styles from '../../components/app/app.module.css';

export const OrderInfoPage: FC = () => (
  <main className={styles.detailPageWrap}>
    <OrderInfo />
  </main>
);
