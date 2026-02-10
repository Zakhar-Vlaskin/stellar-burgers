import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

import { getErrorMessage } from './utils';

export type OrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderData: TOrder | null;
  orderDataLoading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  orderData: null,
  orderDataLoading: false,
  error: null
};

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/createOrder', async (payload, { rejectWithValue }) => {
  try {
    const data = await orderBurgerApi(payload);
    return data.order;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Не удалось создать заказ'));
  }
});

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/fetchOrderByNumber', async (number, { rejectWithValue }) => {
  try {
    const data = await getOrderByNumberApi(number);
    if (!data.orders.length) {
      return rejectWithValue('Заказ не найден');
    }

    return data.orders[0];
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, 'Не удалось получить данные заказа')
    );
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
    },
    clearOrderData: (state) => {
      state.orderData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload || 'Не удалось создать заказ';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderDataLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderDataLoading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderDataLoading = false;
        state.error = action.payload || 'Не удалось получить данные заказа';
      });
  }
});

export const { clearOrderModal, clearOrderData } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
