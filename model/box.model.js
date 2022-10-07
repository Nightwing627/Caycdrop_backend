const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Box = sequelize.define('tbl_boxs', {
    ancestor_box: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
    },
    cost: {
      type: DataTypes.DOUBLE,
    },
    original_price: {
      type: DataTypes.DOUBLE,
    },
    currency: {
      type: DataTypes.STRING,
    },
    icon_url: {
      type: DataTypes.STRING,
    },
    level_required: {
      type: DataTypes.INTEGER,
    },
    tag_ids: {
      type: DataTypes.STRING,
    },
    max_purchase_daily: {
      type: DataTypes.DOUBLE,
    },
    purchasable: {
      type: DataTypes.BOOLEAN,
    },
    sellable: {
      type: DataTypes.BOOLEAN,
    },
    openable: {
      type: DataTypes.BOOLEAN,
    },
    slug: {
      type: DataTypes.STRING,
    },
    market: {
      type: DataTypes.STRING,
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

  return Box
}