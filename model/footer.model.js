const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Footer = sequelize.define('tbl_footer', {
    classes: { type: DataTypes.STRING },
    link: { type: DataTypes.STRING },
    is_new_tab: { type: DataTypes.BOOLEAN },
    image: { type: DataTypes.JSON },
    text: { type: DataTypes.STRING },
    visibleFor: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    hasNext: { type: DataTypes.BOOLEAN },
    hasPrev: { type: DataTypes.BOOLEAN },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    timestamps: false
  })

  return Footer
}