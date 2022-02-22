const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HOME_FITTING', {
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
    message: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    invoice: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    return: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    returnInvoice: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'HOME_FITTING',
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
