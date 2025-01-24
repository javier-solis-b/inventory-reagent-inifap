// C:\Users\javis\OneDrive\Documentos\inventory-reagents-inifap\Backend\src\Users\Models\SolucionesStock.js
import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const SolucionesStock = sequelize.define('soluciones_stock', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_solucion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false});

export { SolucionesStock };
