import { SolucionesStock } from '../Models/SolucionesStock.js';
import { SolucionRecursos } from '../Models/SolucionRecursos.js';
import { sequelize } from '../../database.js';

export const createSolucionStockController = async (request, response) => {
    const { nombre_solucion, recursos } = request.body;

    const t = await sequelize.transaction();

    try {
        const solucion = await SolucionesStock.create({ nombre_solucion }, { transaction: t });
        const solucion_id = solucion.id;

        for (const recurso of recursos) {
            await SolucionRecursos.create({
                solucion_id: solucion_id,
                recurso_id: recurso.recurso_id,
                cantidad_usada: recurso.cantidad_usada
            }, { transaction: t });
        }

        await t.commit();
        return response.status(201).json({ message: 'Solución stock creada exitosamente' });
    } catch (error) {
        console.error('Error al crear la solución:', error); // <-- Esta línea imprime el error
        await t.rollback();
        return response.status(500).json({ error: 'Error al crear la solución stock' });
    }
};
