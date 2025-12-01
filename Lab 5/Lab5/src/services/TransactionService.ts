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
}
