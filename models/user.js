'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Aruskas, { 
        foreignKey: 'userId' ,
        onDelete: 'CASCADE'
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: true,
      defaultValue: 'user'
    },

  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};