import { SolucionesStock } from '../Models/SolucionesStock.js';
import { SolucionRecursos } from '../Models/SolucionRecursos.js';

export const createSolucionStockController = async (request, response) => {
  const { nombre_solucion, recursos } = request.body;

  try {
    // Crear la solución stock
    const solucion = await SolucionesStock.create({ nombre_solucion });

    // Crear los recursos asociados a la solución
    const promises = recursos.map(recurso => {
      return SolucionRecursos.create({
        solucion_id: solucion.id,
        recurso_id: recurso.recurso_id,
        cantidad_usada: recurso.cantidad_usada
      });
    });

    // Esperar a que todas las promesas se resuelvan
    await Promise.all(promises);

    response.status(201).json({ message: 'Solución creada con éxito' });
  } catch (err) {
    console.error('Error al crear la solución stock:', err);
    response.status(500).json({ message: 'Error al crear la solución stock' });
  }
};
