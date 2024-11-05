import backend from '@/backend';
import { AlmacenService } from './AlmacenService'; // Asegúrate de importar correctamente

export class RecursoService {
    static async all(){
        try {
            const recursosResponse = await backend.get('/recursos');
            const almacenesResponse = await AlmacenService.all();

            // Crea un objeto para mapear IDs de almacenes a nombres
            const almacenesMap = new Map(almacenesResponse.map(almacen => [almacen.id, almacen.nombre_almacen]));

            // Mapear la respuesta para incluir el nombre del almacen
            return recursosResponse.data.map(resource => ({
                ...resource,
                almacen: almacenesMap.has(resource.catalogo_id) 
                    ? almacenesMap.get(resource.catalogo_id)
                    : '-'
            }));
        } catch (error) {
            console.error('Error al cargar recursos:', error);
            throw error;
        }
    }

    // ... otros métodos estáticos ...
}
