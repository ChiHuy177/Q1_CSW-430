import apiClient from './apiClient';

export class AuthService {
  static async login(phone: string, password: string) {
    const response = await apiClient.post('/auth', {
      phone,
      password,
    });
    return response.data;
  }
}
