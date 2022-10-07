const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Setting = sequelize.define('tbl_settings', {
    code: {
      type: DataTypes.STRING
    },
    key: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.JSON,
    },
    type: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  }, {
    timestamps: false
  })

  return Setting
}