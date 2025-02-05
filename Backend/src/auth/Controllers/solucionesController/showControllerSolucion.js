//C:\Users\javis\OneDrive\Documentos\inventory-reagents-inifap\Backend\src\auth\Controllers\solucionesController\showControllerSolucion.js
import { SolucionesStock } from "../../../Users/Models/SolucionesStock";

export const showControllerSolucion = async (request, response) => {
    const solucionId = request.params.id;

    const Solucion =  await SolucionesStock.findOne({
        where:{
            id: solucionId
        }
    });

    return response.json(Solucion);
}