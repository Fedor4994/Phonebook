import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'types/auth';
import { AuthSlice } from './authSlice';

axios.defaults.baseURL = 'https://connection-api-fsv.onrender.com/api';

const token = {
  set(token: string | null) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.Authorization = '';
  },
};

export const register = createAsyncThunk<
  {
    token: string | null;
    user: User;
  },
  Pick<User, 'email' | 'name' | 'password'>,
  {
    state: {
      auth: AuthSlice;
    };
  }
>('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/users/register', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const logIn = createAsyncThunk<
  {
    token: string | null;
    user: User;
  },
  Pick<User, 'email' | 'password'>,
  {
    state: {
      auth: AuthSlice;
    };
  }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      // await axios.post('/users/logout');
      token.unset();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk<
  { user: User },
  undefined,
  {
    state: {
      auth: AuthSlice;
    };
  }
>(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const persistToken = state.auth.token;

    if (persistToken === null) {
      return rejectWithValue('');
    }

    token.set(persistToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const { isFetchingCurrentUser } = getState().auth;
      if (isFetchingCurrentUser) {
        return false;
      }
    },
  }
);

export const updateAvatar = createAsyncThunk<
  {
    avatarURL: string;
  },
  { avatar: FormData },
  {
    state: {
      auth: AuthSlice;
    };
  }
>('auth/updateAvatar', async ({ avatar }, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch('/users/avatars', avatar, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});
