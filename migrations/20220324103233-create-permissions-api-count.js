"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("permissions_api_counts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      messageId: {
        type: Sequelize.STRING,
        unique: true,
      },
      env: {
        type: Sequelize.STRING,
      },
      msgVersion: {
        type: Sequelize.STRING,
      },
      msgType: {
        type: Sequelize.STRING,
      },
      integratorId: {
        type: Sequelize.INTEGER,
      },
      accessorId: {
        type: Sequelize.INTEGER,
      },
      accessPointId: {
        type: Sequelize.INTEGER,
      },
      permissionsAddedCount: {
        type: Sequelize.INTEGER,
      },
      permissionsRemovedCount: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("permissions_api_counts");
  },
};
