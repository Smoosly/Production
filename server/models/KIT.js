const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('KIT', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PK_ID: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    recipient: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    postcode: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    extraAddress: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'KIT',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "PK_ID" },
        ]
      },
      {
        name: "PK_ID_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PK_ID" },
        ]
      },
    ]
  });
};
