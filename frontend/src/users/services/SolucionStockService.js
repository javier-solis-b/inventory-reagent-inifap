import backend from '@/backend';

export class SolucionService {
    static async all(){
        const response = await backend.get('/soluciones');
        return response.data ?? [];
    }
}
