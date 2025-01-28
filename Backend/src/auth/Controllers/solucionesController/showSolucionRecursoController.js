import { SolucionRecursos } from '../../../Users/Models/SolucionRecursos.js';

export const showSolucionRecursoController = async (request, response) => {
    const recursoId = request.params.id;

    const solucionRecurso = await SolucionRecursos.findOne({
        where: {
            id: recursoId
        }
    });

    return response.json(solucionRecurso);
}
