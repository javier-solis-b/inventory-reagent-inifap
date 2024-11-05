import { Recurso } from "../../../Users/Models/Recursos.js";

export const recursoDeleteController = async (request, response) => {
    const recursoId = request.params.id;

    await Recurso.destroy({
        where: {
            id: recursoId
        }
    })
    response.status(204).json({});
}