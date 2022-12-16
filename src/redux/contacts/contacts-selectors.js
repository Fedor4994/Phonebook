export const getFilter = state => state.filter;

export const getVisibleContacts = state => {
  const normalizedFilter = getFilter(state).toLowerCase();
  const visibleContacts = getContacts(state).filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
  return visibleContacts;
};

export const getContacts = state => state.contacts.items;

export const getIsLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;
