const { Router } = require('express');
const productsRoutes = require('./products.routes');
const cartRoutes = require('./cart.routes');

const routes_init = () => {
    const router = Router();

    router.use('/products', productsRoutes);
    router.use('/cart', cartRoutes);

    return router;
}

module.exports = { routes_init }