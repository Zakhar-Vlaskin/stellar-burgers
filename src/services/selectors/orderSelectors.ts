import { RootState } from '../store';

export const selectOrderState = (state: RootState) => state.order;

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectOrderData = (state: RootState) => state.order.orderData;

export const selectOrderDataLoading = (state: RootState) =>
  state.order.orderDataLoading;

export const selectOrderError = (state: RootState) => state.order.error;
