/**
 * Keep this file in sync with the code in the "Usage" section
 * in /docs/manual/other-topics/typescript.md
 *
 * Don't include this comment in the md file.
 */
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey } from 'sequelize';
import sequelize from '@app/database';

import User from './user';

class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;

  // foreign keys are automatically added by associations methods (like Project.belongsTo)
  // by branding them using the `ForeignKey` type, `Project.init` will know it does not need to
  // display an error if ownerId is missing.
  declare ownerId: ForeignKey<User['id']>;
  declare name: string;

  // `owner` is an eagerly-loaded association.
  // We tag it as `NonAttribute`
  declare owner?: NonAttribute<User>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'projects'
  }
);
export default Project;
