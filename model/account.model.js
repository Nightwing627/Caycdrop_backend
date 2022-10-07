const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  const Account = sequelize.define("tbl_account", {
    user_code: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    g_rank: {
      type: DataTypes.INTEGER,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    locked_chat: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    sticky_referee: {
      type: DataTypes.BOOLEAN,
    },
    total_deposit: {
      type: DataTypes.DOUBLE,
    },
    total_rake_back: {
      type: DataTypes.INTEGER,
    },
    daily_withdraw_limit: {
      type: DataTypes.DOUBLE,
    },
    team_id: {
      type: DataTypes.INTEGER,
    },
    is_trader: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    last_paypal_deposit_at: {
      type: DataTypes.DATE,
    },
    suspected_trader: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_authentic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  }, 
  {
    timestamps: false
  }
  )
  
  return Account
}