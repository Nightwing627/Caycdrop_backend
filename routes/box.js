const express = require('express')
const { route } = require('.')
const router = express.Router()
const BoxController = require('../controller/box.controller')

router.get('/list', BoxController.findAll)

router.get('/filters', BoxController.getFilterOptions)

module.exports = router