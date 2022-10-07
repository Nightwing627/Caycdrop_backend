const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Tags = sequelize.define('tbl_tag', {
    code: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    },
    icon: {
      type: DataTypes.STRING
    },
    visible: {
      type: DataTypes.BOOLEAN
    },
    position: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
    }
  }, {
    timestamps: false
  });

  return Tags;
}