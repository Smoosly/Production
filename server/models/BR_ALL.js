const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BR_ALL', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PK_ITEM: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    OLD_KEY: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    BD_NAME: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    BRA_NAME: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    COLOR: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LINK: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PRICE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SIZE: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SIZE_ONLY: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BR_ALL',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
