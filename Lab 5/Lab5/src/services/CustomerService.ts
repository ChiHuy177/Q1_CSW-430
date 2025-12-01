import apiClient from './apiClient';

export class CustomerService {
  static async getAllCustomers() {
    const response = await apiClient.get('/customers');
    return response.data;
  }

  static async createNewCustomer(name: string, phone: string) {
    const response = await apiClient.post('/customers', {
      name,
      phone,
    });
    return response.data;
  }
}
