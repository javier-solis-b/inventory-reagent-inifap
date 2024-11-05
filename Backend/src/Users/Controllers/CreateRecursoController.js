import { Recurso } from '../Models/Recursos.js'; // Asegúrate de importar el modelo correcto


export const createRecursoController = async (request, response) => {
    const {  catalogo_id, nombre,tipo_recurso, no_inventario, marca, pm, formula, capacidad_r, lote, recipientes_actuales } = request.body;

    if(!nombre || !tipo_recurso || !no_inventario || !marca || !formula || !capacidad_r|| !lote|| !recipientes_actuales  ) {
        return response.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const resource = await Recurso.create({
        
        nombre: nombre,
        tipo_recurso: tipo_recurso,
        no_inventario: no_inventario,
        marca: marca,
        pm: pm,
        formula: formula,
        capacidad_r: capacidad_r,
        lote: lote,
        recipientes_actuales: recipientes_actuales,
        catalogo_id: catalogo_id
    });

    console.log("¡Recurso creado exitosamente!");

    // Serializar manualmente el recurso para incluir todos los campos necesarios
    const serializedResource = {
        id: resource.id,
        nombre: resource.nombre,
        tipo_recurso: resource.tipo_recurso,
        no_inventario: resource.no_inventario,
        marca: resource.marca,
        pm: resource.pm,
        formula: resource.formula,
        capacidad_r: resource.capacidad_r,
        lote: resource.lote,
        recipientes_actuales: resource.recipientes_actuales,
        catalogo_id: resource.catalogo_id
    };

    response.status(201).json(serializedResource); // Usar .json() en lugar de .send() para enviar objetos directamente
}
