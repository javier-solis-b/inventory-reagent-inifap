import { Sequelize } from "sequelize"
//connection
const sequelize = new Sequelize(
    'sigires_bd',
    'root',
    '0309',
    {
        host: 'localhost',
        dialect: 'mysql'
    })

export { sequelize };