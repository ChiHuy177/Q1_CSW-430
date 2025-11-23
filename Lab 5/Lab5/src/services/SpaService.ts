import { Service } from '../pages/ServiceScreen';
import apiClient from './apiClient';

export class SpaService {
  static async getAllServices(): Promise<Service[]> {
    const response = await apiClient.get('/services');
    return response.data;
  }

  static async createNewService(name: string, price: number) {
    const response = await apiClient.post('/services', {
      name,
      price,
    });
    return response.data;
  }

  static async updateService(id: string, name: string, price: number) {
    const response = await apiClient.put('/services/'+id, {
      name,
      price,
    });
    return response.data;
  }

  static async deleteService(id: string) {
    const response = await apiClient.delete('/services/' + id);
    return response.data;
  }
}
