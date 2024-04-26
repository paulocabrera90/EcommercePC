const { Router } = require('express');
const productsRoutes = require('./products.routes');
const cartRoutes = require('./cart.routes');
const {goIndex} = require('../controllers/indexController')

const routes_init = () => {
    const router = Router();

    router.use('/products', productsRoutes);
    router.use('/cart', cartRoutes);
    router.use('/', goIndex)

    return router;
}

module.exports = { routes_init }