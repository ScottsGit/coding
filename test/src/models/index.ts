/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from 'sequelize';

import User from './user';
import Project from './project';

// const config = require('../../config/config');

// // Choose the appropriate environment
// const env = process.env.NODE_ENV || 'development';
// const dbConfig = config[env];

// Create the Sequelize instance
const sequelize: Sequelize = new Sequelize('db.sql', {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    multipleStatements: true
  }
});

User.hasMany(Project, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'projects' // this determines the name in `associations`!
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db: { [key: string]: any } = {
  User: User,
  Project: Project,
  sequelize: sequelize,
  Sequelize: Sequelize
};

export { db };
