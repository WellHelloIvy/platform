'use strict';
import { sequelize } from '.';
import { Optional, Model, DataTypes } from 'sequelize';

  interface UserAttributes {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
    cashBalance: number,
  }

  interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
  interface UserInstance extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

  class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
      firstName: string;
      lastName: string;
      email: string;
      hashedPassword: string;
      cashBalance: number;
      public id!: number;
      public readonly createdAt!: Date;
      public readonly updatedAt!: Date;
  };
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: new DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: new DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING,
        allowNull: false,
      },
      hashedPassword: {
        type: new DataTypes.STRING,
        allowNull: false,
      },
      cashBalance: {
        type: new DataTypes.DECIMAL,
        allowNull: false,
      }
  }, {
    tableName: "users",
    sequelize,
    modelName: 'User',
  });

