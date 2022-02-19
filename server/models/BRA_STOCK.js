const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BRA_STOCK', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PK_ITEM: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OLD_KEY: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    PK_SIZE: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    PK_ID: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    COLOR: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    SEND_REAL: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PROBLEM: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NEED_WASH: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NUM_WASH: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BRA_STOCK',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
