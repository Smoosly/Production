const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RECOM_RESULT', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PK_ID: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    PK_ITEM: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    OLD_KEY: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    SIZE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    COLOR: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    LINK: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PRICE: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'RECOM_RESULT',
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
