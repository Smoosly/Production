const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BRA_REVIEW', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PK_ID: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    RANKING: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    COMPLETE: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    PK_ITEM: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    PK_SIZE: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    OLD_KEY: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    FIT: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    HOOK: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BAND_PRESSURE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BAND_FIT: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UNCOM_DETAIL: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    SATIS_GATHER: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SATIS_PUSHUP: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SATIS_SURGE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SATIS_ACCBREAST: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SATIS_ACCBACK: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    QUALITY: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TOTAL_SCORE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PURCHASE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PURCHASE_REASON: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BRA_REVIEW',
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
