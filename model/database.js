const dbConfig = require("../config/db.config")

const Sequelize = require("Sequelize")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})

const db = {
  Sequelize,
  sequelize,
  users: require("./user.model")(sequelize),
  account: require("./account.model")(sequelize),
  box: require("./box.model")(sequelize),
  boxItem: require("./boxItem.model")(sequelize),
  country: require("./country.model")(sequelize),
  exchangeRate: require("./exchangeRate.model")(sequelize),
  item: require("./item.model")(sequelize),
  setting: require("./setting.model")(sequelize),
  userCart: require("./userCart.model")(sequelize),
  userDocument: require("./userDocument.model")(sequelize),
  userInfo: require("./userInfo.model")(sequelize),
  userProgress: require("./userProgress.model")(sequelize),
  userVerify: require("./userVerify.model")(sequelize),
  userWallet: require("./wallet.model")(sequelize),
  tags: require("./tag.model")(sequelize),
  footers: require("./footer.model")(sequelize),
  resetPassword: require('./resetPassword.model')(sequelize)
}

module.exports = db
