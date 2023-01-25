import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Contact } from 'types/contact';
import { ContactsSlice } from './contactsSlice';

export const fetchContacts = createAsyncThunk<
  Contact[],
  undefined,
  {
    state: {
      contacts: ContactsSlice;
    };
  }
>(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/contacts');
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const { isLoading } = getState().contacts;
      if (isLoading) {
        return false;
      }
    },
  }
);

export const addContact = createAsyncThunk<
  Contact,
  Pick<Contact, 'name' | 'number'>,
  {
    state: {
      contacts: ContactsSlice;
    };
  }
>(
  'contacts/addContact',
  async ({ name, number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/contacts', { name, number });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const { isLoading } = getState().contacts;
      if (isLoading) {
        return false;
      }
    },
  }
);

export const deleteContact = createAsyncThunk<
  Contact,
  string,
  {
    state: {
      contacts: ContactsSlice;
    };
  }
>(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/contacts/${contactId}`);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const { isLoading } = getState().contacts;
      if (isLoading) {
        return false;
      }
    },
  }
);

export const updateContact = createAsyncThunk<
  Contact,
  Contact,
  {
    state: {
      contacts: ContactsSlice;
    };
  }
>(
  'contacts/updateContact',
  async (newContact, { rejectWithValue }) => {
    try {
      const name = newContact.name;
      const number = newContact.number;
      const { data } = await axios.patch(`/contacts/${newContact.id}`, {
        name,
        number,
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const { isLoading } = getState().contacts;
      if (isLoading) {
        return false;
      }
    },
  }
);
