import 'react-native-get-random-values';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type Contact = {
  name: string;
  picture: string;
  phone: string;
  cell: string;
  email: string;
  favorite: boolean;
};

export const mapContact = (contact: Contact) => {
  const { name, picture, phone, cell, email } = contact;

  return {
    id: uuidv4(),
    name: name.first + ' ' + name.last,
    picture: picture.thumbnail,
    phone,
    cell,
    email,
    favorite: Math.random() < 0.1 ? true : false,
  };
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [] as Contact[],
  },
  reducers: {
    fetchContactsSuccess: (states, action) => {
      console.log(action.payload.map(mapContact));
      states.contacts = action.payload.map(mapContact);
    },
  },
});

export const { fetchContactsSuccess } = contactsSlice.actions;

export const applicationStore = configureStore({
  reducer: contactsSlice.reducer,
});

export type RootState = ReturnType<typeof applicationStore.getState>;
