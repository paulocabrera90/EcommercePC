const { Router } = require('express')
const productsRoutes = require('./products.routes') 


const routes_init = () => {
    const router = Router()

    router.use('/products', productsRoutes)
    router.use('/cart', productsRoutes)

    return router
}

module.exports = { routes_init }