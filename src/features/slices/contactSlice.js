// @ts-nocheck
/** eslint-disable no-unused-vars */

import { createSlice} from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";
import {createEntityAdapter} from '@reduxjs/toolkit'


const customEntityAdapter = createEntityAdapter({
  // Specify unique identifier field for entities
  selectId: entity => entity.customId,

  // Sort order for entities
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});
let initialState = {
  contact:[]
}
const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    addContact: (state, action) => {
      state.contact = state.contact.length>0 ? [...state.contact, action.payload]:[action.payload];
    },
    editContact: (state, action) => {
      const { id, updatedContact } = action.payload;
      const index = state.contact.findIndex(contact => contact.id === id);
      if (index !== -1) {
        state.contact[index] = { ...state.contact[index], ...updatedContact };
      }
    },
    deleteContact: (state, action) => {
      return state.contact.filter(contact => contact.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
        state = initialState;
    });
  }
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;