import { createSlice, isAnyOf, SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Contact } from 'types/contact';
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
  fetchFavoriteContacts,
  updateContactAvatar,
} from './contacts-operations';

export type ContactsSlice = {
  items: Contact[];
  isLoading: boolean;
  isLoadingAvatar: boolean;
  error: SerializedError | null;
  editedContact: Contact | null;
};

const contactsInitialState: ContactsSlice = {
  items: [],
  isLoading: false,
  isLoadingAvatar: false,
  error: null,
  editedContact: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  reducers: {
    setEditedContact(state, { payload }) {
      state.editedContact = payload;
    },
  },

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })

      .addCase(fetchFavoriteContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })

      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })

      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = [
          ...state.items.filter(contact => contact._id !== payload.message),
        ];
      })
      .addCase(updateStatusContact.fulfilled, (state, { payload }) => {
        state.items.forEach(contact => {
          if (contact._id === payload.message._id) {
            contact.favorite = payload.message.favorite;
          }
        });
      })

      .addCase(
        updateContact.fulfilled,
        (
          state,
          {
            payload: {
              message: { _id, email, name, phone },
            },
          }
        ) => {
          state.items.forEach(contact => {
            if (contact._id === _id) {
              contact.name = name || '';
              contact.phone = phone || '';
              contact.email = email || '';
            }
          });
        }
      )
      .addCase(updateContactAvatar.pending, state => {
        state.isLoadingAvatar = true;
      })
      .addCase(updateContactAvatar.fulfilled, (state, { payload }) => {
        state.items.forEach(contact => {
          if (contact._id === payload._id) {
            contact.avatarURL = payload.avatarURL;
          }
        });
        state.isLoadingAvatar = false;
      })
      .addCase(updateContactAvatar.rejected, state => {
        state.isLoadingAvatar = false;
        toast.error('Avatar must be an image');
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          fetchFavoriteContacts.pending,
          addContact.pending,
          deleteContact.pending,
          updateContact.pending
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          fetchFavoriteContacts.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled,
          updateContact.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          fetchFavoriteContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          updateContact.rejected
        ),
        (state, { error }) => {
          state.isLoading = false;
          state.error = error;
        }
      ),
});

export const contactsReducer = contactsSlice.reducer;
export const { setEditedContact } = contactsSlice.actions;
