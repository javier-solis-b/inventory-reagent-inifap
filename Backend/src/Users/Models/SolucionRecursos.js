// C:\Users\javis\OneDrive\Documentos\inventory-reagents-inifap\Backend\src\Users\Models\SolucionRecursos.js
import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";
import { Recurso } from "./Recursos.js";
import { SolucionesStock } from "./SolucionesStock.js";

const SolucionRecursos = sequelize.define('solucion_recursos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    solucion_id: {
        type: DataTypes.INTEGER,
        references: {
            model: SolucionesStock,
            key: 'id',
        }
    },
    recurso_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Recurso,
            key: 'id',
        }
    },
    cantidad_usada: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {timestamps: false});

export { SolucionRecursos };
