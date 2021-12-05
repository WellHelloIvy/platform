'use strict';
import { Model, Optional } from 'sequelize';

interface AssetAttributes {
  id: number;
  userId: number;
  cryptoId: string;
  quantity: number;
}

interface AssetCreationAttributes extends Optional<AssetAttributes, "id">{}

module.exports = (sequelize:any, DataTypes:any) => {
  class Asset extends Model<AssetAttributes, AssetCreationAttributes> implements AssetAttributes{
    id!:number;
    userId!:number;
    cryptoId!:string;
    quantity!:number;
    static associate(models:any) {
    }
  };
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
