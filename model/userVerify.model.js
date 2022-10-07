const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const UserVerify = sequelize.define("tbl_user_verify", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    token: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
  })

  return UserVerify
}