const express = require('express')
const imagesProductsController = require('../controllers/productsController')
const imagesProductsRoutes = express.Router()

imagesProductsRoutes
    .get(`/images/code/:code`, imagesProductsController.getImageProducts)


module.exports = imagesProductsRoutes