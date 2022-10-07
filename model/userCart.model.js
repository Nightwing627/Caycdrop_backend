const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const UserCart = sequelize.define('tbl_user_cart', {
    user_id: {
      type: DataTypes.INTEGER,
    },
    item_id: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    timestamps: false
  })

  return UserCart
}