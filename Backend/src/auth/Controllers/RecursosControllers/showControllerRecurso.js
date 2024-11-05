import { Recurso } from "../../../Users/Models/Recursos.js";


export const showControllerRecurso = async (request, response) => {
    const recursoId = request.params.id;

    const recurso =  await Recurso.findOne({
        where:{
            id: recursoId
        }
    });

    return response.json(recurso);
}