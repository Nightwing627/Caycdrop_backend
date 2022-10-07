const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Country = sequelize.define('tbl_country', {
    code: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    dial_code: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false
  })

  return Country
}