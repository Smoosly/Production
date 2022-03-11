const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PK_ID: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "usercode"
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "BASIC"
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    birthyear: {
      type: DataTypes.DATE,
      allowNull: true
    },
    postcode: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    extraAddress: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    agreePromotion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    provider: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'USER',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "createdAt" },
        ]
      },
      {
        name: "usercode",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PK_ID" },
        ]
      },
      {
        name: "PK_ID",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "PK_ID" },
        ]
      },
    ]
  });
};
