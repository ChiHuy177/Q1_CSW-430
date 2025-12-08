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

  static async getCustomerById(id: string) {
    const response = await apiClient.get('/customers/' + id);
    return response.data;
  }

  static async updateCustomer(id: string, name: string, phone: string) {
    const response = await apiClient.put('/customers/' + id, {
      name,
      phone,
    });
    return response.data;
  }

  static async deleteCustomer(id: string) {
    const response = await apiClient.delete('/customers/' + id);
    return response.data;
  }
}
