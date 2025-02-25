import backend from '@/backend';

export class SolucionStockService {
  // Obtener todas las soluciones
  static async all() {
    const response = await backend.get('/soluciones');
    return response.data ?? [];
  }

  // Obtener una solución específica por su ID
  static async get(id) {
    const response = await backend.get(`/soluciones/${id}`);
    return response.data;
  }

  // Crear una nueva solución
  static async create(data) {
    const response = await backend.post('/soluciones', data);
    return response.data;
  }

  // Actualizar una solución existente
  static async update(id, data) {
    const response = await backend.put(`/soluciones/${id}`, data);
    return response.data;
  }

  // Eliminar una solución
  static async delete(id) {
    const response = await backend.delete(`/soluciones/${id}`);
    return response.data;
  }
}