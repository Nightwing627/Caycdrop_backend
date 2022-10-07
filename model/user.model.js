const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const User = sequelize.define("tbl_users", {
    code: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
    is_subscribe: {
      type: DataTypes.BOOLEAN,
    },
    is_termsService: {
      type: DataTypes.BOOLEAN,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    steam_id: {
      type: DataTypes.STRING,
    },
    steam_apiKey: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE
    }
  }, 
  {
    timestamps: false
  })

  return User
}
