import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './apiClient';

export class AuthService {
  static async login(phone: string, password: string) {
    const response = await apiClient.post('/auth', {
      phone,
      password,
    });
    AsyncStorage.setItem('token', response.data.token);
    AsyncStorage.setItem('userName', response.data.name);
    return response.data;
  }
}
