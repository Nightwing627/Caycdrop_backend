const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const ExchangeRate = sequelize.define('tbl_exchange_rate', {
    currency: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.DOUBLE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  }, {
    timestamps: false
  })

  return ExchangeRate
}