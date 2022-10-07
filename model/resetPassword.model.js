const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const ResetPassword = sequelize.define('tbl_user_password_reset', {
    user_code: { type: DataTypes.STRING },
    token: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false
  })

  return ResetPassword
}