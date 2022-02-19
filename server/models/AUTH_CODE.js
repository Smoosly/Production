const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AUTH_CODE', {
    EMAIL: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    CODE: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'AUTH_CODE',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EMAIL" },
        ]
      },
    ]
  });
};
