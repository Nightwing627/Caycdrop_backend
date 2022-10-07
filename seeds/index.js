const db = require('../model/database')

const tagSeeds = require('./tag.seed')
const boxSeeds = require('./box.seed')

const init = () => {
  db.tags.bulkCreate(tagSeeds)
  db.box.bulkCreate(boxSeeds)
}

module.exports = init;