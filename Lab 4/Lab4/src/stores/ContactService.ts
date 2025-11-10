import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from './ApplicationStore';
import { v4 as uuidv4 } from 'uuid';
const CONTACTS_KEY = '@contacts_storage';

export class ContactService {
  static mapContact(contact: any) {
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
  }
  static getContacts = async (): Promise<Contact[]> => {
    try {
      const data = await AsyncStorage.getItem(CONTACTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  static async save(contacts: Contact[]): Promise<void> {
    try {
      await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    } catch (error) {
      console.error('Error saving contacts:', error);
      throw error;
    }
  }

  static async removeAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CONTACTS_KEY);
    } catch (error) {
      console.error('Error removing contacts:', error);
      throw error;
    }
  }

  static async fetchFromAPI(apiContacts: any[]): Promise<Contact[]> {
    const mappedContacts = apiContacts.map(this.mapContact);
    await this.save(mappedContacts);
    return mappedContacts;
  }
}
