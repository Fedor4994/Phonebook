import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const filterInitialState: string = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setFilter(_, actions: PayloadAction<string>) {
      return actions.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
