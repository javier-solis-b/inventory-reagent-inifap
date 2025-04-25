import { Almacen } from '../../../Users/Models/Almacenes.js'

export const almacenDeleteController = async (request, response) => {
    const almacenId = request.params.id;
    try {
        await Almacen.destroy({
            where: {
                id: almacenId
            }
        })
        response.status(204).json({});
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            // Maneja el error de clave foránea
            response.status(400).json({
                message: 'No se puede eliminar el Almacen porque contiene recursos. se recomienda eliminar los recursos que contiene o cambiarlos de almacén'

            });
        } else {
            console.error('Error al eliminar recurso:', error);
            response.status(500).json({
                message: 'No se puede eliminar el Almacen porque contiene recursos. se recomienda eliminar los recursos que contiene o cambiarlos de almacén.'
            });
        }
    }
}