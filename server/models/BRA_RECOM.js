const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BRA_RECOM', {
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
    COMPLETE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    NUM: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DECISION: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    SIZE: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    wBR_EFFECT: {
      type: DataTypes.STRING(45),
      allowNull: true
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
    SELECTED_COLOR_1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BREAST_SCORE_1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EFFECT_SCORE_1: {
      type: DataTypes.INTEGER,
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
    SELECTED_COLOR_2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BREAST_SCORE_2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EFFECT_SCORE_2: {
      type: DataTypes.INTEGER,
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
    SELECTED_COLOR_3: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BREAST_SCORE_3: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EFFECT_SCORE_3: {
      type: DataTypes.INTEGER,
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
    SELECTED_COLOR_4: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BREAST_SCORE_4: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EFFECT_SCORE_4: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PK_ITEM_5: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OLD_KEY_5: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SIZE_5: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SELECTED_COLOR_5: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BREAST_SCORE_5: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EFFECT_SCORE_5: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PK_ITEM_6: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OLD_KEY_6: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SIZE_6: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SELECTED_COLOR_6: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BREAST_SCORE_6: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EFFECT_SCORE_6: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PK_ITEM_7: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OLD_KEY_7: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SIZE_7: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SELECTED_COLOR_7: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BREAST_SCORE_7: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EFFECT_SCORE_7: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PK_ITEM_8: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OLD_KEY_8: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SIZE_8: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SELECTED_COLOR_8: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BREAST_SCORE_8: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EFFECT_SCORE_8: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PK_ITEM_9: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OLD_KEY_9: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SIZE_9: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SELECTED_COLOR_9: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BREAST_SCORE_9: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EFFECT_SCORE_9: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PK_ITEM_10: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    OLD_KEY_10: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SIZE_10: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SELECTED_COLOR_10: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BREAST_SCORE_10: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EFFECT_SCORE_10: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BRA_RECOM',
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
