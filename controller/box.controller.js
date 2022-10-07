const db = require('../model/database')
const Box = db.box;
const Tag = db.tags

const BoxController = {
  findAll: async (req, res) => {
    
    res.status(200).json('data list')
  },

  getFilterOptions: async (req, res) => {
    // visible tag list
    const tags = await Tag.findAll({
      attributes: { exclude: ['id'] },
      where: { visible: true }
    })

    const orders = [
      { value: 'recommend', label: 'Recommended'},
      { value: 'm_open', label: 'Most Opened Boxes'},
      { value: 'l_open', label: 'Leaset Opened Boxes'},
      { value: 'm_popular', label: 'Most Popular'},
      { value: 'l_popular', label: 'Least Popular'},
      { value: 'p_to_high', label: 'Price(Low to High)'},
      { value: 'p_to_low', label: 'Price(High to low)'},
      { value: 'new', label: 'Newest'},
      { value: 'old', label: 'Oldest'}
    ]
    res.status(200).json({
      tags, orders
    })
    // order types
  }
}

module.exports = BoxController