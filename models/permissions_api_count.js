"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class permissions_api_count extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  permissions_api_count.init(
    {
      messageId: DataTypes.STRING,
      env: DataTypes.STRING,
      msgVersion: DataTypes.STRING,
      msgType: DataTypes.STRING,
      integratorId: DataTypes.INTEGER,
      accessorId: DataTypes.INTEGER,
      accessPointId: DataTypes.INTEGER,
      permissionsAddedCount: DataTypes.INTEGER,
      permissionsRemovedCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "permissions_api_count",
    }
  );
  return permissions_api_count;
};
