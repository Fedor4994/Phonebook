import { RootState } from 'redux/store';

export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const getUser = (state: RootState) => state.auth.user;
export const getIsLoading = (state: RootState) => state.auth.isLoading;
export const getIsFetchingUser = (state: RootState) =>
  state.auth.isFetchingCurrentUser;
