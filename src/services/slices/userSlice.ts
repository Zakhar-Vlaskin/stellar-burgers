import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserApi } from '@api';
import { TUser } from '@utils-types';

export type UserState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null
};

export const fetchUser = createAsyncThunk('user/fetch', async () => {
  const data = await getUserApi();
  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователя';
      });
  }
});

export const userReducer = userSlice.reducer;
