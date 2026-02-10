import { combineReducers } from '@reduxjs/toolkit';

import {
  authReducer,
  constructorReducer,
  feedReducer,
  ingredientsReducer,
  orderReducer,
  passwordReducer,
  profileOrdersReducer
} from './slices';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  auth: authReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  order: orderReducer,
  password: passwordReducer
});
