'use strict';
import { Model, Optional } from 'sequelize';

interface TransactionAttributes {
  id: number;
  userId: number;
  cryptoId: string;
  price: number;
  quantity: number;
  buy: boolean;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, "id">{}

module.exports = (sequelize:any, DataTypes:any) => {
  class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    id!:number;
    userId!:number;
    cryptoId!:string;
    price!:number;
    quantity!:number;
    buy!:boolean;
    static associate(models:any) {}
  };

  Transaction.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cryptoId: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    buy: {
      type:DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
