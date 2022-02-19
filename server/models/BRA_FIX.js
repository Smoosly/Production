const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BRA_FIX', {
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
    CHECK_ADMIN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    CHECK_ALL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    H_FITTING_APPLY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    NUM: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SIZE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    PK_ITEM_1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OLD_KEY_1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SIZE_1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    PK_SIZE_1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    PK_ITEM_2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OLD_KEY_2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SIZE_2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    PK_SIZE_2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    PK_ITEM_3: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OLD_KEY_3: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SIZE_3: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    PK_SIZE_3: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    PK_ITEM_4: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OLD_KEY_4: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SIZE_4: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    PK_SIZE_4: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BRA_FIX',
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
