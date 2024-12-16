import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const Recurso = sequelize.define('recursos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_recurso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    no_inventario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING
    },
    pm: {
        type: DataTypes.STRING
    },
    formula: {
        type: DataTypes.STRING
    },
    capacidad_r: {
        type: DataTypes.FLOAT
    },
    lote: {
        type: DataTypes.STRING
    },
    recipientes_actuales: {
        type: DataTypes.STRING
    },
    catalogo_id: {
        type: DataTypes.INTEGER
    },
    unidad_medida: {
        type: DataTypes.STRING
    },
    fecha_caducidad: {
        type: DataTypes.STRING
    }
}, {timestamps: false});

export { Recurso };
