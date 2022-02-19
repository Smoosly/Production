const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BR_CH', {
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
    HOOK: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    mWIDTH_INNER_WING: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    mWIDTH_OUTER_WING: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    CUP_SHAPE: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    WIRE: {
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
    NUM_SIDEBONE: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    UPPER_COVER: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    L_SHAPE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DETACH_PP: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    BIGGER_SCORE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    GATHER_SCORE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PUSHUP_SCORE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SUPPORT_SCORE: {
      type: DataTypes.INTEGER,
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
    PP_SCORE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DESIGN_CONCEPT: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    mTHICKNESS_DETACH_PP: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    mTHICKNESS_STRAP: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BR_CH',
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
