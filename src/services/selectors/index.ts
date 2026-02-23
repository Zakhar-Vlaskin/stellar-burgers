import { RootState } from '../store';

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const selectIngredients = (state: RootState) => state.ingredients.data;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectIngredientById = (state: RootState, id: string) =>
  state.ingredients.data.find((ingredient) => ingredient._id === id) || null;

export const selectOrderRequest = (state: RootState) => state.order.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectUser = (state: RootState) => state.user.user;
