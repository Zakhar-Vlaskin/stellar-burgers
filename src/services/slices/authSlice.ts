import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

import { getErrorMessage } from './utils';

export type AuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
  updateUserError: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
  updateUserError: null
};

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
};

const clearTokens = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};

export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('auth/registerUser', async (payload, { rejectWithValue }) => {
  try {
    const data = await registerUserApi(payload);
    saveTokens(data.accessToken, data.refreshToken);
    return data.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Ошибка регистрации'));
  }
});

export const loginUser = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('auth/loginUser', async (payload, { rejectWithValue }) => {
  try {
    const data = await loginUserApi(payload);
    saveTokens(data.accessToken, data.refreshToken);
    return data.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Ошибка авторизации'));
  }
});

export const getUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data.user;
    } catch (error) {
      clearTokens();
      return rejectWithValue(
        getErrorMessage(error, 'Не удалось получить данные пользователя')
      );
    }
  }
);

export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('auth/updateUser', async (payload, { rejectWithValue }) => {
  try {
    const data = await updateUserApi(payload);
    return data.user;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, 'Не удалось обновить данные пользователя')
    );
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Ошибка выхода из аккаунта')
      );
    } finally {
      clearTokens();
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка регистрации';
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка авторизации';
        state.isAuthChecked = true;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error =
          action.payload || 'Не удалось получить данные пользователя';
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.updateUserError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.updateUserError =
          action.payload || 'Не удалось обновить данные пользователя';
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
        state.updateUserError = null;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload || 'Ошибка выхода из аккаунта';
        state.isAuthChecked = true;
      });
  }
});

export const { setAuthChecked } = authSlice.actions;

export const authReducer = authSlice.reducer;
