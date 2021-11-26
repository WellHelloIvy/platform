'use strict';
import { Model, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  cashBalance: number;
}

interface LoginArguments {
  email: 'string',
  password: 'string'
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    hashedPassword!: string;
    cashBalance!: number;
    static associate(models: any) {
      // define association here
    }

    toSafeObject = () => {
      const { id, email } = this;
      return { id, email };
    }

    validatePassword = (password: string) => {
      return bcrypt.compareSync(password, this.hashedPassword)
    }

    static async getCurrentUserById(id:number) {
      return await User.scope('currentUser').findByPk(id);
     };



    static async login({ email, password }: LoginArguments) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
            email,
          },
        });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cashBalance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['email', 'hashedPassword', 'cashBalance', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: { exclude: [] },
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
