import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../../database.js';

const SolucionesStock = sequelize.define('SolucionesStock', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_solucion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false });

export { SolucionesStock };
