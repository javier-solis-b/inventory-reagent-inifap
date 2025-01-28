import backend from '@/backend';

export class SolucionStockService {
  static async all() {
    const response = await backend.get('/soluciones');
    return response.data ?? [];
  }
}
