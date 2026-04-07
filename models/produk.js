'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produk.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id'
      });
    }
  }
  Produk.init({
    kategori: DataTypes.ENUM('Produk', 'Jasa'),
    stok: DataTypes.INTEGER,
    produk: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    biaya: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Produk',
  });
  return Produk;
};