'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            autoIncrement: false,
          },
          firstName: {
            type: DataTypes.STRING,
          },
          lastName: {
            type: DataTypes.STRING,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: DataTypes.STRING,
          accessToken: DataTypes.STRING,
          verifyStatus: DataTypes.INTEGER,
          status: DataTypes.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  },
};