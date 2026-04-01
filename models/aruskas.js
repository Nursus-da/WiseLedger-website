'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aruskas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Aruskas.belongsTo(models.User, { 
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
  }
  Aruskas.init({
    tipe: DataTypes.ENUM('Pendapatan', 'Pengeluaran'),
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id'
        },
        onDelete: 'CASCADE'
      },
    tanggal: DataTypes.DATE,
    deskripsi: DataTypes.STRING,
    jumlah: DataTypes.DECIMAL(10, 2),
    simpanke: DataTypes.ENUM('rekening', 'uang_kas'),
  }, {
    sequelize,
    modelName: 'Aruskas',
  });
  return Aruskas;
};