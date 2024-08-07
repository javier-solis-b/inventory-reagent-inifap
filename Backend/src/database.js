import { Sequelize } from "sequelize"
//connection
const sequelize = new Sequelize(
    'sigires_bd',
    'root',
    'pao1234',
    {
        host: 'localhost',
        dialect: 'mysql'
    })

export { sequelize };