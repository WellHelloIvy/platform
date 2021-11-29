'use strict';
import { Model, Optional } from 'sequelize';

interface WatchlistAttributes {
  id: number;
  userId: number;
  name: string;
}

interface WatchlistCreationAttributes extends Optional<WatchlistAttributes, "id">{}

module.exports = (sequelize:any, DataTypes:any) => {
  class Watchlist extends Model<WatchlistAttributes, WatchlistCreationAttributes> implements WatchlistAttributes {
    id!:number;
    userId!:number;
    cryptoId!:string;
    name!:string;

    static associate(models:any) {
      Watchlist.hasMany(models.WatchlistCrypto, {foreignKey: 'watchlistId'})
    }
  };

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
