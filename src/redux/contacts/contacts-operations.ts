import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Contact, ContactForUpdate } from 'types/contact';
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
  Pick<Contact, 'name' | 'phone' | 'email'>,
  {
    state: {
      contacts: ContactsSlice;
    };
  }
>(
  'contacts/addContact',
  async ({ name, phone, email }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/contacts', { name, phone, email });
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
  { message: string },
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
      data.message = contactId;
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
  { message: ContactForUpdate },
  ContactForUpdate,
  {
    state: {
      contacts: ContactsSlice;
    };
  }
>(
  'contacts/updateContact',
  async (newContact, { rejectWithValue }) => {
    try {
      const { name, phone, email, _id } = newContact;
      const { data } = await axios.put(`/contacts/${_id}`, {
        name,
        phone,
        email,
      });
      data.message = newContact;
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
