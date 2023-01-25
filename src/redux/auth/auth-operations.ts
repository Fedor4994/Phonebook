import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'types/auth';
import { AuthSlice } from './authSlice';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

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
  Pick<User, 'email' | 'name'>,
  {
    state: {
      auth: AuthSlice;
    };
  }
>('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
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
  Pick<User, 'email' | 'name'>,
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
      await axios.post('/users/logout');
      token.unset();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk<
  User,
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
