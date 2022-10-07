const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const UserDocument = sequelize.define('tbl_user_document', {
    code: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    doc_type: {
      type: DataTypes.STRING,
    },
    file_path_1: {
      type: DataTypes.STRING,
    },
    file_path_2: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    timestamps: false
  })

  return UserDocument
}