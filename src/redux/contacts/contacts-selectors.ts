import { RootState } from 'redux/store';

export const getFilter = (state: RootState) => state.filter;
export const getEditedContact = (state: RootState) =>
  state.contacts.editedContact;

export const getVisibleContacts = (state: RootState) => {
  const normalizedFilter = getFilter(state).toLowerCase();
  const visibleContacts = getContacts(state).filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
  return visibleContacts;
};

export const getContacts = (state: RootState) => state.contacts.items;

export const getIsLoading = (state: RootState) => state.contacts.isLoading;
export const getIsLoadingAvatar = (state: RootState) =>
  state.contacts.isLoadingAvatar;
export const getError = (state: RootState) => state.contacts.error;
