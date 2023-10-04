const express = require('express')
const imagesProductsRoutes = require('./imagesProductsRoutes')

const routes = (app) => {
    app.use(
        express.json(),
        imagesProductsRoutes
    )
}

module.exports = routes