import { RootState } from '../store';

export const selectIngredientsState = (state: RootState) => state.ingredients;

export const selectIngredients = (state: RootState) => state.ingredients.items;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectIngredientById = (state: RootState, id: string) =>
  state.ingredients.items.find((item) => item._id === id);
