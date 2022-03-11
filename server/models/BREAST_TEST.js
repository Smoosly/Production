const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BREAST_TEST', {
    ID: {
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
    LEFT_IMG_PATH: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "LEFT_IMG_PATH_UNIQUE"
    },
    RIGHT_IMG_PATH: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "RIGHT_IMG_PATH_UNIQUE"
    },
    STEP: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    WHERE_BT: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mINNER_LEN_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mOUTER_LEN_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mLOWER_LEN_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mWIDTH_LC_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mINNER_WIDTH_LC_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mOUTER_WIDTH_LC_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mLEN_LC_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mCURVE_INNER_LC_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mCURVE_OUTER_LC_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mHEIGHT_LC_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mVOLUME_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mINNER_LEN_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mOUTER_LEN_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mLOWER_LEN_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mHEIGHT_LC_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mLEN_LC_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mWIDTH_LC_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mINNER_WIDTH_LC_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mOUTER_WIDTH_LC_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mCURVE_INNER_LC_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mCURVE_OUTER_LC_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mVOLUME_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mUNDER_BUST: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mUPPER_BUST: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    mSHtoBP: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mSHOULDER: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BRA_SIZE_UB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BRA_SIZE_CUP: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NUM_BRATABASE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DIFF_BT_GAP: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DIFF_BP_DIR: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DIFF_BT_SAG: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DIFF_STR: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TYPE_BT_SIZEDIFF: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TYPE_BT_FLESH: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TYPE_SHOULDER: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TYPE_RIB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TYPE_ACCBREAST: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TYPE_BT_FINISH_L: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TYPE_BT_FINISH_R: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wPRESSURE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wTYPE: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    wPP: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wBR_EFFECT: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    wBR_EFFECT_MOST: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wMATERIAL: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    wMATERIAL_STR: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    wDESIGN_CONCEPT: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    wCOLOR_TASTE: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    wPRICE_MIN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wPRICE_MAX: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wIMPORTANT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BIRTH_YEAR: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BREAST_TEST',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
          { name: "PK_ID" },
        ]
      },
      {
        name: "LEFT_IMG_PATH_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "LEFT_IMG_PATH" },
        ]
      },
      {
        name: "RIGHT_IMG_PATH_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RIGHT_IMG_PATH" },
        ]
      },
    ]
  });
};
