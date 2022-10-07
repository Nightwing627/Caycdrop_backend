const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Item = sequelize.define('tbl_items', {
    code: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
    },
    icon_url: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    brand: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.DOUBLE,
    },
    usable: {
      type: DataTypes.BOOLEAN,
    },
    obtainable: {
      type: DataTypes.BOOLEAN,
    },
    withdrawable: {
      type: DataTypes.BOOLEAN,
    },
    min_rarity: {
      type: DataTypes.STRING,
    },
    max_rarity: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
    },
    released_at: {
      type: DataTypes.DATE,
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

  return Item;
}