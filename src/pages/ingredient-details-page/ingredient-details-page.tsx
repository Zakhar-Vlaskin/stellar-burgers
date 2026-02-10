import { FC } from 'react';

import { IngredientDetails } from '@components';

import styles from '../../components/app/app.module.css';

export const IngredientDetailsPage: FC = () => (
  <main className={styles.detailPageWrap}>
    <h2 className={`${styles.detailHeader} text text_type_main-large mb-8`}>
      Детали ингредиента
    </h2>
    <IngredientDetails />
  </main>
);
