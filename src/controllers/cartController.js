const globalConstants = require('../const/globalConst');
const { getProducts, findAllCategories } = require('../services/productService');
const { createCarts, createDataCart } = require('../services/cartService');
const port = globalConstants.PORT;
const applicationName = globalConstants.APPLICATION_NAME;
const traslate = require('../utils/traslate');

async function getAll (req, res){
    try {
        console.log("Inicio de carga del carrito...");
        const encodedProductsForCart = req.query.products;
        
        let productCartResponse =  JSON.parse(encodedProductsForCart);

        console.log("productCartResponse-> ", productCartResponse);

        res.render('cart/cart', {
            productsResponse: productCartResponse,
            port,
            applicationName
        });

    } catch (error) {
        console.error("/GET Error al obtener carrito: ", error);
        res.status(500).send("Error al obtener carrito");
    }
}

async function createCart (req, res){
    try {
        let productsResponse;
        let categoriesResponse;

        console.log("Inicio de creacion del carrito...");
        const cartRerquest = req.body;
        console.log("cartRerquest-> ", cartRerquest);

        const cart = await createDataCart(cartRerquest);
        console.log("Objeto cart final para guardar en json-> ", cart);
        createCarts(cart);

        productsResponse = await getProducts();
        productsResponse = await traslate.translateAllProducts(productsResponse);
        categoriesResponse = await findAllCategories(); 

        res.render('products/products', { 
            productsResponse , 
            categoriesResponse,
            port,
            applicationName
        });

        

    } catch (error) {
        console.error("/GET Error al obtener carrito: ", error);
        res.status(500).send("Error al obtener carrito");
    }
}

module.exports= { 
    getAll,
    createCart
}