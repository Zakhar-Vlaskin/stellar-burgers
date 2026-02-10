import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  selectIngredientById,
  selectIngredients,
  selectIngredientsLoading
} from '@selectors';
import { fetchIngredients } from '@slices';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useDispatch, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();

  const { id = '' } = useParams();

  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsLoading);
  const ingredientData = useSelector((state) =>
    selectIngredientById(state, id)
  );

  useEffect(() => {
    if (!ingredients.length) {
      void dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  if (
    (isLoading && !ingredients.length) ||
    (!ingredientData && !ingredients.length)
  ) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return <p className='text text_type_main-medium'>Ингредиент не найден</p>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
