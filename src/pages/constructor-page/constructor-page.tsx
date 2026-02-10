import { FC, useEffect } from 'react';

import { selectIngredients, selectIngredientsLoading } from '@selectors';
import { fetchIngredients } from '@slices';

import styles from './constructor-page.module.css';

import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { useDispatch, useSelector } from '../../services/store';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();

  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    if (!ingredients.length) {
      void dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
