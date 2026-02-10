import { RootState } from '../store';

export const selectProfileOrdersState = (state: RootState) =>
  state.profileOrders;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;

export const selectProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.isLoading;
