import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../../database.js';
import { SolucionesStock } from './SolucionesStock.js';
import { Recurso } from './Recursos.js';

const SolucionRecursos = sequelize.define('SolucionRecursos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  solucion_id: {
    type: DataTypes.INTEGER,
    references: {
      model: SolucionesStock,
      key: 'id'
    }
  },
  recurso_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recurso,
      key: 'id'
    }
  },
  cantidad_usada: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, { timestamps: false });

export { SolucionRecursos };
