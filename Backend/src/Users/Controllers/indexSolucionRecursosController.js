import { SolucionRecursos } from '../../Users/Models/SolucionRecursos.js';

export const indexSolucionRecursosController = async (request, response) => {
    response.json(await SolucionRecursos.findAll());
}
