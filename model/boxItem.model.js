const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const BoxItem = sequelize.define('tbl_box_items', {
    box_id: {
      type: DataTypes.INTEGER,
    },
    code: {
      type: DataTypes.STRING
    },
    item_id: {
      type: DataTypes.INTEGER,
    },
    rate_id: {
      type: DataTypes.FLOAT,
    },
    roll_start: {
      type: DataTypes.DOUBLE,
    },
    roll_end: {
      type: DataTypes.DOUBLE,
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

  return BoxItem
}