import { createSlice } from '@reduxjs/toolkit';
import { User } from 'types/auth';
import {
  getCurrentUser,
  logIn,
  logOut,
  register,
  updateAvatar,
} from './auth-operations';

export type AuthSlice = {
  user: Pick<User, 'name' | 'email' | 'avatarURL'>;
  token: string | null;
  isLoggedIn: boolean;
  isFetchingCurrentUser: boolean;
  isLoading: boolean;
};

const initialState: AuthSlice = {
  user: { name: '', email: '', avatarURL: '' },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  isLoading: false,
};

const authSilce = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, state => {
        state.isLoading = false;
      })
      .addCase(logIn.pending, state => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, state => {
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: '', email: '', avatarURL: '' };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.pending, state => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.user.email = payload.user.email;
        state.user.name = payload.user.name;
        state.user.avatarURL = payload.user.avatarURL;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        state.user.avatarURL = payload.avatarURL;
      }),
});

export default authSilce.reducer;
export type AuthReducer = ReturnType<typeof authSilce.reducer>;
