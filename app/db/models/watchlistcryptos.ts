'use strict';
import { Model, Optional } from 'sequelize';

interface WatchlistCryptoAttributes {
  id: number;
  watchlistId: number;
  cryptoId: string;
}

interface WatchlistCryptoCreationAttributes extends Optional<WatchlistCryptoAttributes, "id">{}

module.exports = (sequelize:any, DataTypes:any) => {
  class WatchlistCryptos extends Model<WatchlistCryptoAttributes, WatchlistCryptoCreationAttributes> implements WatchlistCryptoAttributes {
    id!: number;
    watchlistId!: number;
    cryptoId!:string;

    static associate(models:any) { }
  };

  WatchlistCryptos.init({
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
    modelName: 'WatchlistCryptos',
  });
  return WatchlistCryptos;
};
