import apiClient from './apiClient';

export class TransactionService {
  static async getAllTransactions() {
    const response = await apiClient.get('/transactions');
    return response.data;
  }

  static async getTransactionById(id: string) {
    const response = await apiClient.get(`/transactions/${id}`);
    return response.data;
  }

  static async createNewTransaction(customerId: string, serviceData: any) {
    console.log(customerId + ' ' + serviceData);
    const response = await apiClient.post('/transactions', {
      customerId: customerId,
      services: serviceData,
    });
    return response.data;
  }

  static async deleteTransaction(id: string) {
    const response = await apiClient.delete('/transactions/' + id);
    return response.data;
  }
}
