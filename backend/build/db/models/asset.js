'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Asset extends sequelize_1.Model {
        static associate(models) {
        }
    }
    ;
    Asset.init({
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
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Asset',
    });
    return Asset;
};
