'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class WatchlistCrypto extends sequelize_1.Model {
        static associate(models) { }
    }
    ;
    WatchlistCrypto.init({
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        watchlistId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cryptoId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'WatchlistCrypto',
    });
    return WatchlistCrypto;
};
