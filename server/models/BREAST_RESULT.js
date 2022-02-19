const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BREAST_RESULT', {
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
    BREAST_SIZE_GENERAL: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    LEFT_LOWER_SHAPE_IMG_PATH: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    RIGHT_LOWER_SHAPE_IMG_PATH: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    LEFT_WIDTH_LC: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    RIGHT_WIDTH_LC: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    LEFT_CURVE_INNER_LC: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    RIGHT_CURVE_INNER_LC: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    LEFT_CURVE_OUTER_LC: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    RIGHT_CURVE_OUTER_LC: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    LEFT_FINISH: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RIGHT_FINISH: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BT_SHAPE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    INOUT_VOLUME: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UPDOWN_VOLUME: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BP_DIR: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BT_SAG: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BT_GAP: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BT_SIZEDIFF: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BT_VOLUMEDIFF: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BT_LSDIFF: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SHOULDER_SHAPE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SHOULDER_WIDTH: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RIB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ACCBREAST: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FLESH: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BREAST_RESULT',
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
