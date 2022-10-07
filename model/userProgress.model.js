const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const UserProgress = sequelize.define("tbl_user_progress", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    xp: {
      type: DataTypes.BIGINT,
    },
    required_xp: {
      type: DataTypes.BIGINT,
    },
    next_required_xp: {
      type: DataTypes.BIGINT,
    },
    level: {
      type: DataTypes.INTEGER,
    },
    updated_at: {
      type: DataTypes.DATE,
    }
  }, {
    timestamps: false,
  })

  return UserProgress
}