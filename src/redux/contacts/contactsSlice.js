import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from './contacts-operations';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
  editedContact: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleError = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  reducers: {
    setEditedContact(state, { payload }) {
      state.editedContact = payload;
    },
  },

  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.items = payload;
    },
    [fetchContacts.rejected]: handleError,

    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.items.push(payload);
    },
    [addContact.rejected]: handleError,

    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled](state, { payload: { id } }) {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(contact => contact.id !== id);
    },
    [deleteContact.rejected]: handleError,
    [updateContact.pending]: handlePending,
    [updateContact.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.items.forEach(contact => {
        if (contact.id === payload.id) {
          contact.name = payload.name;
          contact.number = payload.number;
        }
      });
    },
    [updateContact.rejected]: handleError,
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { setEditedContact } = contactsSlice.actions;
