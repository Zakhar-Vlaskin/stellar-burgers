import { RootState } from '../store';

export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;

export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;
