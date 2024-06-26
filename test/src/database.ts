/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from 'sequelize';

// const config = require('../config/config');

// // Choose the appropriate environment
// const env = process.env.NODE_ENV || 'development';
// const dbConfig = config[env];

// Create the Sequelize instance
const sequelize = new Sequelize('mysql://ms_admin:ms_admin@localhost:3306/database_development', {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    multipleStatements: true
  }
});

export default sequelize;
