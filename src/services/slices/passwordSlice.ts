import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { forgotPasswordApi, resetPasswordApi } from '@api';

import { getErrorMessage } from './utils';

export type PasswordState = {
  isLoading: boolean;
  error: string | null;
};

const initialState: PasswordState = {
  isLoading: false,
  error: null
};

export const forgotPassword = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>('password/forgotPassword', async (payload, { rejectWithValue }) => {
  try {
    await forgotPasswordApi(payload);
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, 'Не удалось отправить письмо для сброса пароля')
    );
  }
});

export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string },
  { rejectValue: string }
>('password/resetPassword', async (payload, { rejectWithValue }) => {
  try {
    await resetPasswordApi(payload);
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, 'Не удалось сбросить пароль')
    );
  }
});

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    clearPasswordError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Не удалось отправить письмо';
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Не удалось сбросить пароль';
      });
  }
});

export const { clearPasswordError } = passwordSlice.actions;

export const passwordReducer = passwordSlice.reducer;
