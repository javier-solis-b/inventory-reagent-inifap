// src/auth/Controllers/solucionesController/usarSolucionController.js
import { sequelize } from "../../database.js";

export const usarSolucionController = async (request, response) => {
  const { solucion_id } = request.params;

  try {
    // Ejecutar el procedimiento almacenado para actualizar el inventario
    await sequelize.query(
      `CALL actualizar_inventario(:solucion_id);`,
      {
        replacements: {
          solucion_id,
        },
      }
    );

    // Respuesta exitosa
    response.status(200).json({
      message: "Inventario actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar el inventario:", error);
    response.status(500).json({
      message: "Error al actualizar el inventario",
      detalles: error.message,
    });
  }
};