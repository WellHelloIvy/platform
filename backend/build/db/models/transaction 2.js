'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transaction extends sequelize_1.Model {
        static associate(models) { }
    }
    ;
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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        buy: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Transaction',
    });
    return Transaction;
};
