import { TOrdersData } from '@utils-types';

import { RootState } from '../store';

export const selectFeedState = (state: RootState) => state.feed;

export const selectFeedOrders = (state: RootState) => state.feed.orders;

export const selectFeedLoading = (state: RootState) => state.feed.isLoading;

export const selectFeedData = (state: RootState): TOrdersData => ({
  orders: state.feed.orders,
  total: state.feed.total,
  totalToday: state.feed.totalToday
});
