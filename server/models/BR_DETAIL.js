const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BR_DETAIL', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PK_ITEM: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    OLD_KEY: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IMG_PATH: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    BRA_NAME: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    BD_NAME: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PRICE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    COLOR: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LINK: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TAGS: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mWIDTH_LC: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    BIGGER_SCORE: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    GATHER_SCORE: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    PUSHUP_SCORE: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    SUPPORT_SCORE: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    ACCBREAST_SCORE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BACK_SCORE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CUP_SHAPE: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    UPPER_COVER: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    EXISTENCE_PP: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    mTHICKNESS_PP: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    LOC_PP: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    DETACH_PP: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    mTHICKNESS_DETACH_PP: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    mWIDTH_INNER_WING: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    mTHICKNESS_STRAP: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    NUM_SIDEBONE: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    WIRE: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    CUP_TYPE: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    HOOK: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    EYE: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    BIGGER_DEGREE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    GATHER_DEGREE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PUSHUP_DEGREE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SUPPORT_DEGREE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ACCBREAST_DEGREE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BACK_DEGREE: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BR_DETAIL',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
