const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const UserWallet = sequelize.define("tbl_user_wallet", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    main: {
      type: DataTypes.DOUBLE,
    },
    main_currency: {
      type: DataTypes.STRING,
    },
    bonus: {
      type: DataTypes.DOUBLE,
    },
    bouns_currency: {
      type: DataTypes.STRING,
    },
    affiliate_earnings: {
      type: DataTypes.DOUBLE,
    },
    affiliate_currency: {
      type: DataTypes.STRING,
    },
    gem_stone: {
      type: DataTypes.DOUBLE,
    },
    gem_currency: {
      type: DataTypes.STRING,
    },
    updated_at: {
      type: DataTypes.DATE,
    }
  }, {
    timestamps: false,
  })

  return UserWallet
}