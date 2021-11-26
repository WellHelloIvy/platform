'use strict';
import { Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  cashBalance: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!:number;
    firstName!:string;
    lastName!:string;
    email!:string;
    hashedPassword!:string;
    cashBalance!:number;
    static associate(models:any) {
      // define association here
    }
  };
  User.init({
    id: {
      allowNull: false,
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
      unique: true,
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
    sequelize,
    modelName: 'User',
  });
  return User;
};
