'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Watchlist extends sequelize_1.Model {
        static associate(models) {
            Watchlist.hasMany(models.WatchlistCrypto, { foreignKey: 'watchlistId' });
            Watchlist.belongsTo(models.User, { foreignKey: 'userId' });
        }
        static createWatchlist(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const watchlist = yield Watchlist.create({
                    name: 'Watchlist',
                    userId: id
                });
                return yield Watchlist.findByPk(watchlist.id);
            });
        }
    }
    ;
    Watchlist.init({
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
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Watchlist',
    });
    return Watchlist;
};
